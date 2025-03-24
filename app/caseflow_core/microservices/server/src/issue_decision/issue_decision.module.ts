import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { IssueDecisionsService } from './services/issue_decision.service';
import { IssueDecisionResolver } from './resolvers/issue_decision.resolver';
import { IssueDecision } from './entities/issue_decision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueDecision])],
  providers: [IssueDecisionResolver, IssueDecisionsService],
})
export class IssueDecisionModule {}
