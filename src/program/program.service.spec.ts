import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Program } from './entities/program.entity'
import { ProgramService } from './program.service'
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
          useValue: {},
        },
      ],
    }).compile()

    repository = module.get<Repository<Program>>(getRepositoryToken(Program))
    service = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const programTitle = 'Methode Lafay 3 semaines'
    const expectedProgram = {
      id: expect.any(String),
      title: programTitle,
    }

    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: programTitle,
    })

    const createdProgram = await service.create(programTitle)

    expect(repository.save).toHaveBeenCalledWith({
      title: programTitle,
    })
    expect(createdProgram).toStrictEqual(expectedProgram)
  })
})
