import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { ProgramService } from './program.service';
import * as Faker from 'faker'

describe('ProgramService', () => {
  let service: ProgramService
  let repository: Repository<Program>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService, 
        {
          provide: getRepositoryToken(Program),
          useValue: {}
        },
      ],
    }).compile();

    repository = module.get<Repository<Program>>(getRepositoryToken(Program))
    service = module.get<ProgramService>(ProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const program = {
      title: 'Programme Appolon'
    }
    const expectedProgram = {
      id: expect.any(String),
      title: program.title,
    }

    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: program.title,
    })

    const createdProgram = await service.create(program)

    expect(repository.save).toHaveBeenCalledWith(program)
    expect(createdProgram).toStrictEqual(expectedProgram)
  })
});
