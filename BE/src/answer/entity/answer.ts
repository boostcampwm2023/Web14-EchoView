import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../app.entity';
import { Member } from '../../member/entity/member';
import { Question } from '../../question/entity/question';

@Entity()
export class Answer extends DefaultEntity {
  @Column()
  content: string;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn()
  member: Member;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn()
  question: Question;

  constructor(
    id: number,
    createdAt: Date,
    content: string,
    member: Member,
    question: Question,
  ) {
    super(id, createdAt);
    this.content = content;
    this.member = member;
    this.question = question;
  }

  static of(content: string, member: Member, question: Question) {
    return new Answer(null, new Date(), content, member, question);
  }

  isOwnedBy(member: Member) {
    return this.member.id === member.id;
  }

  isAnswerOf(question: Question) {
    return this.question.id === question.id;
  }
}
