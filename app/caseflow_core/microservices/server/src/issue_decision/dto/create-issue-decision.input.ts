import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';


@InputType()
export class CreateIssueDecisionInput {
  @Field()
  issue: string;

  @Field()
  eaoRole: string;

  @Field()
  outcome: string;

  @Field()
  impact: number;
}
