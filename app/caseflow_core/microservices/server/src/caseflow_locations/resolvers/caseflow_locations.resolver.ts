import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //
import { CaseflowLocationsService } from '../services/caseflow_locations.service';
import { CaseflowLocationsResponse } from '../entities/locations_response.entity';
import { CaseflowLocations } from '../entities/caseflow_locations.entity';
import { CreateCaseflowLocationsInput } from '../dto/create-caseflow-locations.input';
import { UpdateCaseflowLocationsInput } from '../dto/update-caseflow-locations.input';

@Resolver(() => CaseflowLocations)
export class CaseflowLocationsResolver {
  constructor(private readonly caseflowLocationsService: CaseflowLocationsService) {}

  @Query(() => CaseflowLocations, { name: 'getLocationsById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowLocationsService.findById(id);
  }

  @Query((returns) => CaseflowLocationsResponse, { name: 'getLocationsList' })
  getLocationsList(): Promise<CaseflowLocationsResponse> {
    return this.caseflowLocationsService.findAll();
  }

  @Query(() => [CaseflowLocations], { name: 'locationsByEmployer' })
  async findByEmployer(@Args('employerId', { type: () => Int }) employerId: number) {
    return this.caseflowLocationsService.findByEmployerId(employerId);
  }

  @Mutation(() => CaseflowLocations, { name: 'createCaseflowLocations' })
  createCaseflowLocations(
    @Args('CreateCaseflowLocationsInput')
    CreateCaseflowLocationsInput: CreateCaseflowLocationsInput,
  ) {
    return this.caseflowLocationsService.createCaseflowLocations(CreateCaseflowLocationsInput);
  }

}