import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { RootDecision } from '../entities/root_decision.entity';
import { RootDecisionsService } from '../services/root_decision.service';
import { CreateRootDecisionInput } from '../dto/create-root_decision.input';

@Resolver((of) => RootDecision)
export class RootDecisionResolver {
  constructor(private rootDecisionService: RootDecisionsService) {}
  @Mutation((returns) => RootDecision, { name: 'createRootDecision' })
  createRootDecision(
    @Args('createRootDecisionInput')
    createRootDecisionInput: CreateRootDecisionInput,
  ): Promise<RootDecision> {
    return this.rootDecisionService.createRootDecision(createRootDecisionInput);
  }
}
