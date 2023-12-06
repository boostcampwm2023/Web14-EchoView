import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';
import { getIdriveS3Client, getPutCommandObject } from 'src/util/idrive.util';
import { v4 as uuidv4 } from 'uuid';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { QuestionRepository } from 'src/question/repository/question.repository';
import {
  IDriveException,
  Md5HashException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
  VideoOfWithdrawnMemberException,
} from '../exception/video.exception';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { validateManipulatedToken } from 'src/util/token.util';
import { isEmpty, notEquals } from 'class-validator';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import * as crypto from 'crypto';
import 'dotenv/config';
import { VideoHashResponse } from '../dto/videoHashResponse';
import { MemberRepository } from 'src/member/repository/member.repository';
import {
  deleteFromRedis,
  getValueFromRedis,
  saveToRedis,
} from 'src/util/redis.util';
import { SingleVideoResponse } from '../dto/singleVideoResponse';
import { MemberNotFoundException } from 'src/member/exception/member.exception';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  createDirectoryIfNotExist,
  encodeToUpload,
  logUploadStart,
  readFileAsBuffer,
  saveVideoIfNotExists,
} from '../../util/encoder.util';
import { PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';
import { IDRIVE_CONFIG } from '../../config/idrive.config';

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private questionRepository: QuestionRepository,
    private memberRepository: MemberRepository,
  ) {}

  async uploadVideo(file: Express.Multer.File) {
    logUploadStart(file.originalname);
    await createDirectoryIfNotExist();
    await saveVideoIfNotExists(file);
    await encodeToUpload(file.originalname);
    return { success: true };
  }

  async sendToBucket(name: string, ext: string) {
    const key = `${uuidv4()}${ext}`;
    const s3 = new S3(IDRIVE_CONFIG);
    const params = {
      Bucket: 'videos',
      ACL: 'private',
      Key: key,
      Body: await readFileAsBuffer(name.replace('.webm', ext)),
    };

    const result = await new Promise((resolve, reject) => {
      s3.putObject(params as PutObjectCommandInput, (err, data) => {
        if (err) reject(err);
        console.log(data);
        resolve(key);
      });
    });
    console.log(result);
  }

  async createVideo(member: Member, createVideoRequest: CreateVideoRequest) {
    validateManipulatedToken(member);

    const newVideo = Video.from(member, createVideoRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(member: Member) {
    validateManipulatedToken(member);
    const key = `${uuidv4()}.webm`;
    const s3 = getIdriveS3Client();
    const command = getPutCommandObject(key);
    const expiresIn = 10;

    try {
      const preSignedUrl = await getSignedUrl(s3, command, { expiresIn });
      return new PreSignedUrlResponse(preSignedUrl, key);
    } catch (error) {
      throw new IDriveException();
    }
  }

  async getVideoDetail(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    const hash = video.isPublic ? this.getHashedUrl(video.url) : null;
    return VideoDetailResponse.from(video, member.nickname, hash);
  }

  async getVideoDetailByHash(hash: string) {
    const originUrl = await getValueFromRedis(hash);
    const video = await this.videoRepository.findByUrl(originUrl);
    if (!video.isPublic) throw new VideoAccessForbiddenException();
    if (isEmpty(video.memberId)) throw new VideoOfWithdrawnMemberException();

    const videoOwner = await this.memberRepository.findById(video.memberId);
    if (isEmpty(videoOwner)) throw new MemberNotFoundException();

    return VideoDetailResponse.from(video, videoOwner.nickname, hash);
  }

  async getAllVideosByMemberId(member: Member) {
    validateManipulatedToken(member);
    const videoList = await this.videoRepository.findAllVideosByMemberId(
      member.id,
    );

    return videoList.map(SingleVideoResponse.from);
  }

  async toggleVideoStatus(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    await this.videoRepository.toggleVideoStatus(videoId); // TODO: 좀 더 효율적인 Patch 로직이 있나 확인
    return this.updateVideoHashInRedis(video);
  }

  async deleteVideo(videoId: number, member: Member) {
    validateManipulatedToken(member);
    const memberId = member.id;
    const video = await this.videoRepository.findById(videoId);
    this.validateVideoOwnership(video, memberId);

    await this.videoRepository.remove(video);
  }

  private validateVideoOwnership(video: Video, memberId: number) {
    if (isEmpty(video)) throw new VideoNotFoundException();
    if (notEquals(memberId, video.memberId))
      throw new VideoAccessForbiddenException();
  }

  private getHashedUrl(url: string): string {
    try {
      const hash = crypto.createHash('md5').update(url).digest('hex');
      return hash;
    } catch (error) {
      throw new Md5HashException();
    }
  }

  private async updateVideoHashInRedis(video: Video) {
    const hash = this.getHashedUrl(video.url);

    if (video.isPublic) {
      // 현재가 public이었으면 토글 후 private이 되기에 redis에서 해시값 삭제 후 null 반환
      await deleteFromRedis(hash);
      return new VideoHashResponse(null);
    }

    await saveToRedis(hash, video.url);
    return new VideoHashResponse(hash);
  }
}
