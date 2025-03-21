import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { IssueDecision } from '../entities/issue_decision.entity';
import { IssueDecisionsService } from '../services/issue_decision.service';
import { CreateIssueDecisionInput } from '../dto/create-issue-decision.input';

@Resolver((of) => IssueDecision)
export class IssueDecisionResolver {
  constructor(private IssueDecisionService: IssueDecisionsService) {}
  @Mutation((returns) => IssueDecision, { name: 'createIssueDecision' })
  createIssueDecision(
    @Args('createIssueDecisionInput')
    createIssueDecisionInput: CreateIssueDecisionInput,
  ): Promise<IssueDecision> {
    return this.IssueDecisionService.createIssueDecision(createIssueDecisionInput);
  }
}
