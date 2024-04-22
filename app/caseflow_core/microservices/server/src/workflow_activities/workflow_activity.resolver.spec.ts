import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowActivityResolver } from './workflow_activities.resolver';
import { WorkflowActivitiesService } from './workflow_activities.service';

describe('WorkflowActivityResolver', () => {
  let resolver: WorkflowActivityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowActivityResolver, WorkflowActivitiesService],
    }).compile();

    resolver = module.get<WorkflowActivityResolver>(WorkflowActivitiesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
