import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


@InputType()
export class CreateWorkflowActivityInput {
  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  caseid: number;

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  userid: string;

  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  taskid: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  taskname: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  formurl: string;

  @Field({ nullable: true })
  @IsString()
  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  selectedform: string;
}
