import { Field, ObjectType, Directive, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Binary } from 'typeorm';

//_____________________Custom Imports_____________________//
import { Cases } from './cases.entity';
import { Versions } from 'src/versions/entities/version.entity';
import { Blob } from 'buffer';

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class CaseDocuments {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  caseId: number;

  @Column({ type: "bytea", nullable: false })
  file: Buffer;

  @Column({ nullable: true })
  @Field({ nullable: true })
  documentref: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  addedbyuserid: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  creationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dmsprovider: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  latestversion: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isdeleted: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  size: number;

  @Field(() => Cases)
  cases: Cases;

  @OneToMany(() => Versions, (versions) => versions.documents)
  @Field(() => [Versions], { nullable: true })
  versions: Versions[];


}
