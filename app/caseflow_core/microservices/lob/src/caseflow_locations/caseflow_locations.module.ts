import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { CaseflowLocationsService } from './services/caseflow_locations.service';
import { CaseflowLocations } from './entities/caseflow_locations.entity';
import { CaseflowLocationsResolver } from './resolvers/caseflow_locations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CaseflowLocations])],
  providers: [CaseflowLocationsResolver, CaseflowLocationsService],
})
export class CaseflowLocationsModule {}
