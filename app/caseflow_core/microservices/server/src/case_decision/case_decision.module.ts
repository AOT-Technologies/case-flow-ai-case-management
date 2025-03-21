import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { CaseDecisionsService } from './services/case_decision.service';
import { CaseDecisionResolver } from './resolvers/case_decision.resolver';
import { CaseDecision } from './entities/case_decision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseDecision])],
  providers: [CaseDecisionResolver, CaseDecisionsService],
})
export class CaseDecisionModule {}
