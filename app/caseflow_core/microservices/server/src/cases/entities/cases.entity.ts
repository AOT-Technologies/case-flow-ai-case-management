import { Field, ObjectType, Int, Directive, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

//_____________________Custom Imports_____________________//

import { CaseHistory } from '../../case_history/entities/case_history.entity';
import { CaseStatuses } from '../../case_status/entities/case_status.entity';
import { CaseTypes } from '../../case_types/entities/case_type.entity';
import { CaseNotes } from 'src/case_notes/entities/case_note.entity';

/**
 * Summary :  Entity Class For External Cases
 * Created By : Akhila U S
 */

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class Cases {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field((type) => Int)
  lobid: number;

  // @Column()
  // @Field()
  // name: string;

  // @Column({ nullable: true })
  // @Field({ nullable: true })
  // desc: string;

  @Column({ nullable: true })
  @Field()
  statusid: number;

  @Column({ nullable: true })
  @Field()
  typeid: number;

  @Column('int', { array: true, nullable: true })
  @Field((type) => [Int], { nullable: true })
  linkedcases: number[];

  @Column({ nullable: true })
  @Field()
  creationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  completiondate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastmodificationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  penduntildate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  archivedate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startuserid: number;

  @Column({ nullable: true })
  @Field()
  currentownerid: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lobcaseid: number;

  @Column('int', { array: true, nullable: true })
  @Field((type) => [Int], { nullable: true })
  involvedparties: number[];

  @Column({ nullable: true })
  @Field()
  isdeleted: boolean;

  // @OneToMany(()=>CaseHistory,casehistory =>casehistory.caseid)
  // @Field(type=>[CaseHistory],{nullable:true})
  // casehistory?:CaseHistory[];

  @OneToMany(() => CaseHistory, (casehistory) => casehistory.case)
  @Field(() => [CaseHistory], { nullable: true })
  casehistory: CaseHistory[];

  @ManyToOne(() => CaseStatuses, (casestatus) => casestatus.cases)
  @Field(() => CaseStatuses, { nullable: true })
  @JoinColumn({ name: 'statusid' })
  casestatus: CaseStatuses;

  @ManyToOne(() => CaseTypes, (casetype) => casetype.cases)
  @Field(() => CaseTypes, { nullable: true })
  @JoinColumn({ name: 'typeid' })
  casestype: CaseTypes;

  @OneToMany(() => CaseNotes, (casenote) => casenote.case)
  @Field(() => [CaseNotes], { nullable: true })
  casenote: CaseNotes[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  contactid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  individualid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dateofbirth: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phonenumber: String;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  region: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  issuetype: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseowner: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  describetheissue: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resolutionsought: string;
}
