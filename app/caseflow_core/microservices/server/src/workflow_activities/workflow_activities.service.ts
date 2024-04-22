import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkflowActivityInput } from './dto/create-workflow_activity.input';
import { UpdateWorkflowActivityInput } from './dto/update-workflow_activity.input';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowActivity } from './entities/workflow_activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowActivitiesService {

  constructor(
    @InjectRepository(WorkflowActivity)
    private workflowActivityRepository: Repository<WorkflowActivity>,
  ) {}

  async create(createWorkflowActivityInput: CreateWorkflowActivityInput) {
    try {
      const newWorkflowActivity =
        this.workflowActivityRepository.create(createWorkflowActivityInput);
      const data = await this.workflowActivityRepository.save(newWorkflowActivity);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByCaseId(id: number) {
    try{

    const value = await this.workflowActivityRepository.find({
      where: {
        caseid: id,
      },  
    });
    if (value) return value;
    throw new NotFoundException(`Record cannot find by id ${id}`);
    
  }
  catch (error) {
    console.log(error);
    throw error;
  }
  }

  async update(taskid: string, updateWorkflowActivityInput: UpdateWorkflowActivityInput) {
    try {
      return await this.workflowActivityRepository.update({taskid:taskid}, updateWorkflowActivityInput).then(() => {
        return this.findByTaskId(taskid).catch((err) => {
          throw new HttpException(err.response, HttpStatus.NOT_FOUND);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Find One Method For Returning Specific Activity
   * @param taskid 
   * @returns 
   */
  async findByTaskId(taskid: string): Promise<WorkflowActivity> {
    try {
    if (taskid) {
      const value = await this.workflowActivityRepository.findOne({
        where: {
          taskid: taskid
        }
      });     
      if (value) return value;

      throw new NotFoundException(`Record cannot find by id ${taskid}`);
    }
    throw new BadRequestException("request doesn't have any id");
  } catch (err) {
    console.log(err);
  }
  }

}