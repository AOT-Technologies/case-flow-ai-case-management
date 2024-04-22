import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowActivitiesService } from './workflow_activities.service';

describe('WorkflowActivitiesService', () => {
  let service: WorkflowActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowActivitiesService],
    }).compile();

    service = module.get<WorkflowActivitiesService>(WorkflowActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
