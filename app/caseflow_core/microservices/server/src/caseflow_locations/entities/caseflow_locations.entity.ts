import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CaseflowEmployers } from '../../caseflow_employers/entities/caseflow_employers.entity'

@ObjectType()
@Entity()
export class CaseflowLocations {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  createdate?: Date;

  @Field(() => CaseflowEmployers)
  @ManyToOne(() => CaseflowEmployers, (employer) => employer.locations, { onDelete: 'CASCADE' })
  employer: CaseflowEmployers;

  @Field(() => Int)
  @Column()
  employerId: number;
}