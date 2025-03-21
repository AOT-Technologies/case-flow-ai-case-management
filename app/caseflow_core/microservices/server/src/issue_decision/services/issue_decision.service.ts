import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { IssueDecision } from '../entities/issue_decision.entity';
import { CreateIssueDecisionInput } from '../dto/create-issue-decision.input';

/**
 *  Service For IssueDecisions
 */
@Injectable()
export class IssueDecisionsService {
  constructor(
    @InjectRepository(IssueDecision) private IssueDecisionRepository: Repository<IssueDecision>,
  ) {}
  async createIssueDecision(createIssueDecisionInput: CreateIssueDecisionInput): Promise<IssueDecision> {
    try {
      const newIssueDecision = this.IssueDecisionRepository.create(createIssueDecisionInput);
      return this.IssueDecisionRepository.save(newIssueDecision);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

