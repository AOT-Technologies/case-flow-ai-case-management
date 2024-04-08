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
import { CaseflowContacts } from '../entities/caseflow_contacts.entity';
import { CaseflowContactsResponse } from '../entities/contacts_response.entity';
import { CreateCaseflowContactsInput } from '../dto/create-caseflow-contacts.input';
import { UpdateCaseflowContactsInput } from '../dto/update-caseflow-contacts.input';

@Injectable()
export class CaseflowContactsService {
  constructor(
    @InjectRepository(CaseflowContacts)
    private caseflowContactsRepository: Repository<CaseflowContacts>,
  ) {}

  async findById(id: number): Promise<CaseflowContacts> {
    try {
      if (id) {
        const value = await this.caseflowContactsRepository.findOne({
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

  async findByIds(id: number): Promise<CaseflowContactsResponse> {
    try {
      if (id) {
        const [CaseflowContacts, totalCount] = await this.caseflowContactsRepository
              .createQueryBuilder('table')
              .where('table.id IN(:...ids)', { ids: id })
              .orderBy({ 'table.id': 'DESC' })
              .getManyAndCount();
            return { CaseflowContacts, totalCount };
      } 
      throw new BadRequestException("request doesn't have any id");
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<CaseflowContactsResponse> {
    try {
      const [CaseflowContacts, totalCount] = await Promise.all([
        this.caseflowContactsRepository.find({
          order: {
            id: 'DESC',
          },
        }),
        this.caseflowContactsRepository.count(),
      ]);
      return { CaseflowContacts, totalCount };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async searchCaseflowContacts(
    searchField,
    skip, 
    take,
  ) {
    try {

      if (searchField) {
        const [CaseflowContacts, totalCount] = await this.caseflowContactsRepository
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
            return { CaseflowContacts, totalCount };
      } else {
        const [CaseflowContacts, totalCount] = await this.caseflowContactsRepository
          .createQueryBuilder('table')
          .orderBy({ 'table.id': 'DESC' })
          .take(take)
          .skip(skip)

          .getManyAndCount();
        return { CaseflowContacts, totalCount };
      }
    } catch (err) {
      return new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCaseflowContacts(
    CreateCaseflowContactsInput: CreateCaseflowContactsInput,
  ): Promise<CaseflowContacts> {
    try {
      const newCaseflowContact = this.caseflowContactsRepository.create(
        CreateCaseflowContactsInput,
      );
      return this.caseflowContactsRepository.save(newCaseflowContact);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateCaseflowContacts(
    id: number,
    updateCaseflowContactsInput: UpdateCaseflowContactsInput,
  ): Promise<CaseflowContacts> {
    try {
      delete updateCaseflowContactsInput.id;
      return await this.caseflowContactsRepository
        .update(id, updateCaseflowContactsInput)
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
        let ret = await this.caseflowContactsRepository.delete(id);
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
