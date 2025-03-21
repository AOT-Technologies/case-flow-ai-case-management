import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { RootDecisionsService } from './services/root_decision.service';
import { RootDecisionResolver } from './resolvers/root_decision.resolver';
import { RootDecision } from './entities/root_decision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RootDecision])],
  providers: [RootDecisionResolver, RootDecisionsService],
})
export class RootDecisionModule {}
