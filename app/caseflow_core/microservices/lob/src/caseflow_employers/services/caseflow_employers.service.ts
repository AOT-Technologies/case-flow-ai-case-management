import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Equal, Repository } from 'typeorm';
  import { HttpStatus } from '@nestjs/common/enums';
  import { HttpException } from '@nestjs/common/exceptions';
  
  //Custom - imports //
//   import { FetchArgs } from '../dto/fetch.input';
  import { CaseflowEmployers } from '../entities/caseflow_employers.entity';
  import { CaseflowEmployersResponse } from '../entities/employers_response.entity';
  import { CreateCaseflowEmployerInput } from '../dto/create-caseflow-employers.input';
  import { UpdateCaseflowEmployerInput } from '../dto/update-caseflow-employers.input';


@Injectable()
export class CaseflowEmployersService {
  constructor(
    @InjectRepository(CaseflowEmployers)
    private readonly caseflowEmployersRepository: Repository<CaseflowEmployers>,
  ) {}

  async createCaseflowEmployers( CreateCaseflowEmployerInput: CreateCaseflowEmployerInput,
    ): Promise<CaseflowEmployers> {
    // return this.caseflowEmployersRepository.save(data);
    try {
        const newCaseflowEmployer = this.caseflowEmployersRepository.create(
            CreateCaseflowEmployerInput,
        );
        return this.caseflowEmployersRepository.save(newCaseflowEmployer);
      } catch (err) {
        console.log(err);
        return err;
      }
  }

  async findAll(): Promise<CaseflowEmployersResponse> {
    // return this.caseflowEmployersRepository.find({ relations: ['locations'] });

    try {
        const [CaseflowEmployers, totalCount] = await Promise.all([
          this.caseflowEmployersRepository.find({
            order: {
              id: 'DESC',
            },
          }),
          this.caseflowEmployersRepository.count(),
        ]);
        return { CaseflowEmployers, totalCount };
      } catch (err) {
        console.log(err);
        return err;
      }
  }

  async findById(id: number): Promise<CaseflowEmployers> {
    return this.caseflowEmployersRepository.findOne({ where: { id }, relations: ['locations'] });
  }
}