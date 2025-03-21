import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { CaseDecision } from '../entities/case_decision.entity';
import { CaseDecisionsService } from '../services/case_decision.service';
import { CreateCaseDecisionInput } from '../dto/create-case_decision.entity';
import { RootDecision } from 'src/root_decision/entities/root_decision.entity';
import { IssueDecision } from 'src/issue_decision/entities/issue_decision.entity';
import { CaseDecisionResponse } from '../entities/case_decision_response.entity';

@Resolver((of) => CaseDecision)
export class CaseDecisionResolver {
  constructor(private CaseDecisionService: CaseDecisionsService) {}
  @Mutation((returns) => CaseDecision, { name: 'createCaseDecision' })
  createCaseDecision(
    @Args('createCaseDecisionInput')
    createCaseDecisionInput: CreateCaseDecisionInput,
  ): Promise<CaseDecision> {
    return this.CaseDecisionService.createCaseDecision(createCaseDecisionInput);
  }

  @Query(() => CaseDecisionResponse, { nullable: true, name: 'getCaseDecisionByCaseId' })
  async getCaseDecisionByCaseId(
    @Args("caseId") caseId: number
  ):  Promise<{ rootDecision: RootDecision; issueDecisions: IssueDecision[] } | null> {
    return this.CaseDecisionService.getCaseDecisionByCaseId(caseId);
  }
}
