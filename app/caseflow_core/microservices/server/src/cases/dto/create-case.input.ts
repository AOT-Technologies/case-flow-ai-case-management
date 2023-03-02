import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Summary :  Create input DTO for Cases
 * Created By : Akhila U S
 */
@InputType()
export class CreateCaseInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  lobid: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  statusid: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  typeid: number;

  @Field((type) => [Int], { nullable: true })
  @IsArray()
  linkedcases: number[];

  @Field({ defaultValue: new Date() })
  @IsDate()
  @IsNotEmpty()
  creationdate: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  completiondate: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  lastmodificationdate: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  penduntildate: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  archivedate: Date;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  startuserid: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  currentownerid: number;

  @Field((type) => [Int], { nullable: true })
  @IsArray()
  involvedparties: number[];

  @Field({ defaultValue: false, nullable: true })
  @IsBoolean()
  @IsNotEmpty()
  isdeleted: boolean;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  lobcaseid: number;

}
