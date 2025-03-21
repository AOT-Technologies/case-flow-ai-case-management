import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRootDecisionInput {
  @Field()
  rootDecisionDate: string;

  @Field()
  rootDecisionAgency: string;

  @Field()
  decisionMaker: string;

  @Field()
  referenceNumber: string;

  @Field()
  decisionDate: string;
}