import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesListService } from './activities-list.service';

describe('ActivitiesListService', () => {
  let service: ActivitiesListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesListService],
    }).compile();

    service = module.get<ActivitiesListService>(ActivitiesListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
