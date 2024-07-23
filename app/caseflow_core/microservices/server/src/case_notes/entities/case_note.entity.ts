
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/entities/cases.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CaseNotes {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseid: number;

  @Column({ nullable: true })
  @Field()
  creationdate: Date;

  @Column({ nullable: true })
  @Field()
  userid: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  notetext: string;

  @ManyToOne(() => Cases, (cases) => cases.id)
  @Field(() => Cases, { nullable: true })
  @JoinColumn({ name: 'id' })
  case: Cases;

  @Column({ nullable: true })
  @Field()
  actiontype: number;
}
