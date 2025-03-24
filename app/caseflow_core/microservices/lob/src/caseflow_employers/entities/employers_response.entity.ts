import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CaseflowEmployers } from './caseflow_employers.entity';

@ObjectType()
export class CaseflowEmployersResponse {
  @Field((type) => [CaseflowEmployers])
  CaseflowEmployers : CaseflowEmployers [];

  @Field((type) => Int)
  totalCount: number;
}
