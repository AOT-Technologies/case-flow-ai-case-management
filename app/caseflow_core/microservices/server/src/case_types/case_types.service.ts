import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//

import { CreateCaseTypeInput } from './dto/create-case_type.input';
import { UpdateCaseTypeInput } from './dto/update-case_type.input';
import { CaseTypes } from './entities/case_type.entity';

@Injectable()
export class CaseTypesService {
  constructor(
    @InjectRepository(CaseTypes)
    private caseTypesRepository: Repository<CaseTypes>,
  ) {}

  create(createCaseTypeInput: CreateCaseTypeInput) {
    return 'This action adds a new caseType';
  }

  findAll() {
    try {
      return this.caseTypesRepository.find({});
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} caseType`;
  }

  async update(id: number, updateCaseTypeInput: UpdateCaseTypeInput) {
    try {
      return await this.caseTypesRepository
        .update(id, updateCaseTypeInput)
        .then(() => {
          return this.caseTypesRepository
            .findOne({
              where: {
                id: id,
              },
            })
            .catch((err) => {
              throw new HttpException(err.response, HttpStatus.NOT_FOUND);
            });
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} caseType`;
  }
}
