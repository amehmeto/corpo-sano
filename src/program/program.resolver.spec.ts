import { Test, TestingModule } from '@nestjs/testing';
import { ProgramResolver } from './program.resolver';

describe('ProgramResolver', () => {
  let resolver: ProgramResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramResolver],
    }).compile();

    resolver = module.get<ProgramResolver>(ProgramResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
