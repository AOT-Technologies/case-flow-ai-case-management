import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateWorkflowActivityInput{
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  taskid: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  status: string;

}
