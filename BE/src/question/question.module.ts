import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question';
import { TokenModule } from 'src/token/token.module';
import { Category } from '../category/entity/category';
import { QuestionService } from './service/question.service';
import { QuestionController } from './controller/question.controller';
import { QuestionRepository } from './repository/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category]), TokenModule],
  providers: [QuestionService, QuestionRepository],
  controllers: [QuestionController],
})
export class QuestionModule {}
