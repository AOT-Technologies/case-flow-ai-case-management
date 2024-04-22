import { Module } from '@nestjs/common';
import { WorkflowActivitiesService } from './workflow_activities.service';
import { WorkflowActivityResolver } from './workflow_activities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowActivity } from './entities/workflow_activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowActivity])],

  providers: [WorkflowActivityResolver, WorkflowActivitiesService]
})
export class WorkflowActivityModule {}
