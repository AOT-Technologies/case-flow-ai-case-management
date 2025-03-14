import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { CaseflowEmployersService } from './services/caseflow_employers.service';
import { CaseflowEmployersResolver } from './resolvers/caseflow_employers.resolver';
import { CaseflowEmployers } from './entities/caseflow_employers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseflowEmployers])],
  providers: [CaseflowEmployersResolver, CaseflowEmployersService],
})
export class CaseflowEmployersModule {}
