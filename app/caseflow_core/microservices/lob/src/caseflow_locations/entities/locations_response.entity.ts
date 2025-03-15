import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CaseflowLocations } from './caseflow_locations.entity';

@ObjectType()
export class CaseflowLocationsResponse {
  @Field((type) => [CaseflowLocations])
  CaseflowLocations : CaseflowLocations [];

  @Field((type) => Int)
  totalCount: number;
}
