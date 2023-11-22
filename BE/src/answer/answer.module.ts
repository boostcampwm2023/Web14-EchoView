import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../member/entity/member';
import { Answer } from './entity/answer';
import { AnswerRepository } from './repository/answer.repository';
import { Question } from '../question/entity/question';
import { AnswerService } from './service/answer.service';
import { AnswerController } from './controller/answer.controller';
import { QuestionRepository } from '../question/repository/question.repository';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Answer, Question]),
    QuestionModule,
  ],
  providers: [AnswerRepository, AnswerService, QuestionRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}
