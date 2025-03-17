import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //
import { CaseflowEmployersService } from '../services/caseflow_employers.service';
import { CaseflowEmployersResponse } from '../entities/employers_response.entity';
import { CaseflowEmployers } from '../entities/caseflow_employers.entity';
import { CreateCaseflowEmployerInput } from '../dto/create-caseflow-employers.input';
import { UpdateCaseflowEmployerInput } from '../dto/update-caseflow-employers.input';

@Resolver(() => CaseflowEmployers)
export class CaseflowEmployersResolver {
  constructor(private readonly caseflowEmployersService: CaseflowEmployersService) {}

  @Query(() => CaseflowEmployers, { name: 'getEmployersById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowEmployersService.findById(id);
  }

  @Query((returns) => CaseflowEmployersResponse, { name: 'getEmployersList' })
  getEmployersList(): Promise<CaseflowEmployersResponse> {
    return this.caseflowEmployersService.findAll();
  }

  @Mutation(() => CaseflowEmployers, { name: 'createCaseflowEmployers' })
  createCaseflowEmployers(
    @Args('CreateCaseflowEmployersInput')
    CreateCaseflowEmployersInput: CreateCaseflowEmployerInput,
  ) {
    return this.caseflowEmployersService.createCaseflowEmployers(CreateCaseflowEmployersInput);
  }

}
