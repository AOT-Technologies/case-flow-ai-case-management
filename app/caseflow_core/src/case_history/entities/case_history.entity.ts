import { Field, ObjectType, Int ,Directive,ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/cases.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()

export class CaseHistory {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field((type) => Int)
  datetime: number;

  @Column()
  @Field()
  outcome: string;

  @Column({ nullable: true })
  @Field()
  userid: number;

  @Column({ nullable: true })
  @Field()
  caseid: number;

  @ManyToOne(()=>Cases,cases => cases.id)
  @Field(type=>[Cases],{nullable:true})
  cases?:Cases[];



}