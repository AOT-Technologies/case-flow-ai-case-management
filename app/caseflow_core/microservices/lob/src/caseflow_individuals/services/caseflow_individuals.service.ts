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
import { FetchArgs } from '../dto/fetch.input';
import { CaseflowIndividuals } from '../entities/caseflow_individuals.entity';
import { CaseflowIndividualsResponse } from '../entities/individuals_response.entity';
import { CreateCaseflowIndividualsInput } from '../dto/create-caseflow-individuals.input';
import { UpdateCaseflowIndividualsInput } from '../dto/update-caseflow-individuals.input';

@Injectable()
export class CaseflowIndividualsService {
  constructor(
    @InjectRepository(CaseflowIndividuals)
    private caseflowIndividualsRepository: Repository<CaseflowIndividuals>,
  ) {}

  async findById(id: number): Promise<CaseflowIndividuals> {
    try {
      if (id) {
        const value = await this.caseflowIndividualsRepository.findOne({
          where: {
            id: id,
          },
        });
        if (value) return value;
        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id");
    } catch (error) {
      return error;
    }
  }

  async findByIds(id: number): Promise<CaseflowIndividualsResponse> {
    try {
      if (id) {
        const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
              .createQueryBuilder('table')
              .where('table.id IN(:...ids)', { ids: id })
              .orderBy({ 'table.id': 'DESC' })
              .getManyAndCount();
            return { CaseflowIndividuals, totalCount };
      } 
      throw new BadRequestException("request doesn't have any id");
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<CaseflowIndividualsResponse> {
    try {
      const [CaseflowIndividuals, totalCount] = await Promise.all([
        this.caseflowIndividualsRepository.find({
          order: {
            id: 'DESC',
          },
        }),
        this.caseflowIndividualsRepository.count(),
      ]);
      return { CaseflowIndividuals, totalCount };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async searchCaseflowIndividuals(
    searchField,
    skip,
    take,
  ) {
    try {
     
      if (searchField) {
        const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
              .createQueryBuilder('table')
              .where('table.firstname ilike :firstname', {
                firstname: `%${searchField}%` ,
              }).orWhere('table.lastname ilike :lastname', {
                lastname: `%${searchField}%` ,
              }).orWhere('table.firstname || \' \' || table.lastname ilike :fullname', {
                fullname: `%${searchField}%` ,
              }).orWhere('table.phonenumber ilike :phonenumber', {
                phonenumber: `%${searchField}%` ,
              }).orWhere("table.id = :id", { id: isNaN(parseInt(searchField))?0:parseInt(searchField)})  
          
              .orderBy({ 'table.id': 'DESC' })
              .take(take)
              .skip(skip)
              .getManyAndCount();
            return { CaseflowIndividuals, totalCount };
      } else {
        const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
          .createQueryBuilder('table')
          .orderBy({ 'table.id': 'DESC' })
          .take(take)
          .skip(skip)

          .getManyAndCount();
        return { CaseflowIndividuals, totalCount };
      }
    } catch (err) {
      return new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCaseflowIndividuals(
    CreateCaseflowIndividualsInput: CreateCaseflowIndividualsInput,
  ): Promise<CaseflowIndividuals> {
    try {
      const newCaseflowIndividual = this.caseflowIndividualsRepository.create(
        CreateCaseflowIndividualsInput,
      );
      return this.caseflowIndividualsRepository.save(newCaseflowIndividual);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateCaseflowIndividuals(
    id: number,
    updateCaseflowIndividualsInput: UpdateCaseflowIndividualsInput,
  ): Promise<CaseflowIndividuals> {
    try {
      delete updateCaseflowIndividualsInput.id;
      return await this.caseflowIndividualsRepository
        .update(id, updateCaseflowIndividualsInput)
        .then(() => {
          return this.findById(id).catch((err) => {
            throw new HttpException(err.response, HttpStatus.NOT_FOUND);
          });
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: number) {
    try {
      let caseData = this.findById(id);
      if (caseData) {
        let ret = await this.caseflowIndividualsRepository.delete(id);
        if (ret.affected === 1) {
          return caseData;
        }
      }
      throw new NotFoundException(`Record cannot find by id ${id}`);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
