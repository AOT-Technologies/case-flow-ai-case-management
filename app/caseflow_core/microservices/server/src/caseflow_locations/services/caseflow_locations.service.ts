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
  import { CaseflowLocations } from '../entities/caseflow_locations.entity';
  import { CaseflowLocationsResponse } from '../entities/locations_response.entity';
  import { CreateCaseflowLocationsInput } from '../dto/create-caseflow-locations.input';
  import { UpdateCaseflowLocationsInput } from '../dto/update-caseflow-locations.input';

@Injectable()
export class CaseflowLocationsService {
  constructor(
    @InjectRepository(CaseflowLocations)
    private readonly CaseflowLocationsRepository: Repository<CaseflowLocations>,
  ) {}

  async createCaseflowLocations( CreateCaseflowLocationsInput: CreateCaseflowLocationsInput,
    ): Promise<CaseflowLocations> {
    // return this.CaseflowLocationsRepository.save(data);
    try {
        const newCaseflowLocation = this.CaseflowLocationsRepository.create(
            CreateCaseflowLocationsInput,
        );
        return this.CaseflowLocationsRepository.save(newCaseflowLocation);
      } catch (err) {
        console.log(err);
        return err;
      }
  }

  async findAll(): Promise<CaseflowLocationsResponse> {
    // return this.CaseflowLocationsRepository.find({ relations: ['locations'] });

    try {
        const [CaseflowLocations, totalCount] = await Promise.all([
          this.CaseflowLocationsRepository.find({
            order: {
              id: 'DESC',
            },
          }),
          this.CaseflowLocationsRepository.count(),
        ]);
        return { CaseflowLocations, totalCount };
      } catch (err) {
        console.log(err);
        return err;
      }
  }

  async findById(id: number): Promise<CaseflowLocations> {
    return this.CaseflowLocationsRepository.findOne({ where: { id } });
  }

  async findByEmployerId(employerId: number): Promise<CaseflowLocations[]> {
    return this.CaseflowLocationsRepository.find({ where: { employerId } });
  }
}