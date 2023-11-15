import { Injectable } from '@nestjs/common';
import { Member } from 'src/member/entity/member';
import { Video } from '../entity/video';
import { VideoRepository } from '../repository/video.repository';
import {
  createObjectParamsForPreSign,
  getIdriveS3Client,
} from 'src/util/idrive.util';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { v4 as uuidv4 } from 'uuid';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { IDriveException } from '../exception/video.exception';
import { VideoListResponse } from '../dto/videoListResponse';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { CreateVideoRequest } from '../dto/createVideoRequest';

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private questionRepository: QuestionRepository,
  ) {}
  async createVideo(member: Member, createVidoeRequest: CreateVideoRequest) {
    if (!member) throw new ManipulatedTokenNotFiltered();

    const newVideo = Video.from(member, createVidoeRequest);
    await this.videoRepository.save(newVideo);
  }

  async getPreSignedUrl(
    member: Member,
    createPreSignedUrlRequest: CreatePreSignedUrlRequest,
  ) {
    const content = await this.getQuestionContent(
      createPreSignedUrlRequest.questionId,
    );
    const key = `${member.nickname}_${content}_${uuidv4()}.mp4`;

    const s3 = getIdriveS3Client();
    try {
      const preSignedUrl = await s3.getSignedUrlPromise(
        'putObject',
        createObjectParamsForPreSign('videos', key),
      );
      return new PreSignedUrlResponse(preSignedUrl, key);
    } catch (error) {
      throw new IDriveException();
    }
  }

  async getAllVideosByMemberId(member: Member) {
    if (!member) throw new ManipulatedTokenNotFiltered();

    const videoList = await this.videoRepository.findAllVideosByMemberId(
      member.id,
    );

    // TODO: 비디오의 썸네일과 길이에 대한 처리도 필요
    return VideoListResponse.from(videoList);
  }

  private async getQuestionContent(questionId: number) {
    const question = await this.questionRepository.findById(questionId);
    return question ? question.content : '삭제된 질문';
  }
}
