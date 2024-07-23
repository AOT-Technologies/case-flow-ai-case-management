import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


@InputType()
export class CreateCaseNoteInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  caseid: number;

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  userid: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  notetext: string;

  @Field({ nullable: true })
  @IsNumber()
  actiontype: number;
}
