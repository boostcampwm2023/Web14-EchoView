import { DefaultEntity } from 'src/app.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Member extends DefaultEntity {
  @Column()
  readonly email: string;

  @Column()
  readonly nickname: string;

  @Column({
    length: 1000,
  })
  readonly profileImg: string;
}