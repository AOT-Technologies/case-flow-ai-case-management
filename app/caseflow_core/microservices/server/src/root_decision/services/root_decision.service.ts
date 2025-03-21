import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { RootDecision } from '../entities/root_decision.entity';
import { CreateRootDecisionInput } from '../dto/create-root_decision.input';

/**
 *  Service For RootDecisions
 */
@Injectable()
export class RootDecisionsService {
  constructor(
    @InjectRepository(RootDecision) private RootDecisionRepository: Repository<RootDecision>,
  ) {}
  async createRootDecision(createRootDecisionInput: CreateRootDecisionInput): Promise<RootDecision> {
    try {
      const newRootDecision = this.RootDecisionRepository.create(createRootDecisionInput);
      return this.RootDecisionRepository.save(newRootDecision);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

