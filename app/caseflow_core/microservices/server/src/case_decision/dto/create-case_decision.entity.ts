import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCaseDecisionInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  caseId: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  rootDecisionId: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  issueDecisionId: number;
}
