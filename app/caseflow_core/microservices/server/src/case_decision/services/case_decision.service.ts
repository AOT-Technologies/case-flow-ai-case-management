import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { CaseDecision } from '../entities/case_decision.entity';
import { CreateCaseDecisionInput } from '../dto/create-case_decision.entity';
import { RootDecision } from 'src/root_decision/entities/root_decision.entity';
import { IssueDecision } from 'src/issue_decision/entities/issue_decision.entity';
/**
 *  Service For CaseDecisions
 */
@Injectable()
export class CaseDecisionsService {
  constructor(
    @InjectRepository(CaseDecision) private CaseDecisionRepository: Repository<CaseDecision>,
  ) {}

  async createCaseDecision(createCaseDecisionInput: CreateCaseDecisionInput): Promise<CaseDecision> {
    try {
      const newCaseDecision = this.CaseDecisionRepository.create(createCaseDecisionInput);
      return this.CaseDecisionRepository.save(newCaseDecision);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCaseDecisionByCaseId(caseId: number): Promise<{ rootDecision: RootDecision; issueDecisions: IssueDecision[] }> {
    // get single root decision
    const caseDecision = await this.CaseDecisionRepository.findOne({
      where: { caseId },
      relations: ["rootDecision"],
    });

    if (!caseDecision) {
      return null;
    }
    // can have multiple issue decisions
    const issueDecisions = await this.CaseDecisionRepository.find({
      where: { caseId },
      relations: ["issueDecision"],
    });

    return {
      rootDecision: caseDecision.rootDecision,
      issueDecisions: issueDecisions.map(cd => cd.issueDecision),
    };
  }
}

