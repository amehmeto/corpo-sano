import { Test, TestingModule } from '@nestjs/testing';
import { AthleteService } from './athlete.service';

describe('AthleteService', () => {
  let service: AthleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthleteService],
    }).compile();

    service = module.get<AthleteService>(AthleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
