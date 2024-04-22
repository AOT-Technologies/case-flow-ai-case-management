
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkflowActivitiesService } from './workflow_activities.service';
import { WorkflowActivity } from './entities/workflow_activity.entity';
import { CreateWorkflowActivityInput } from './dto/create-workflow_activity.input';
import { UpdateWorkflowActivityInput } from './dto/update-workflow_activity.input';

@Resolver(() => WorkflowActivity)
export class WorkflowActivityResolver {
  constructor(private readonly workflowActivityService: WorkflowActivitiesService) {}

  @Mutation(() => WorkflowActivity)
  createWorkflowActivity(@Args('createWorkflowActivityInput') createWorkflowActivityInput: CreateWorkflowActivityInput) {
    return this.workflowActivityService.create(createWorkflowActivityInput);
  }

  @Query(() => [WorkflowActivity], { name: 'workflowActivitiesByCaseId' })
  workflowActivitiesByCaseId(@Args('id', { type: () => Int }) id: number) {
    return this.workflowActivityService.findByCaseId(id);
  }

  @Mutation(() => WorkflowActivity)
  updateWorkflowActivity(@Args('updateWorkflowActivityInput') updateWorkflowActivityInput: UpdateWorkflowActivityInput) {
    return this.workflowActivityService.update(updateWorkflowActivityInput.taskid, updateWorkflowActivityInput);
  }
}



