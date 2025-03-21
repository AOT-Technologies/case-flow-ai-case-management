
import { ObjectType, Field } from "@nestjs/graphql";
import { RootDecision } from "src/root_decision/entities/root_decision.entity";
import { IssueDecision } from "src/issue_decision/entities/issue_decision.entity";

@ObjectType()
export class CaseDecisionResponse {
  @Field(() => RootDecision)
  rootDecision: RootDecision;

  @Field(() => [IssueDecision])
  issueDecisions: IssueDecision[];
}