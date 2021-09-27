import { Test, TestingModule } from '@nestjs/testing'
import { ProgramService } from './program.service'
import * as Faker from 'faker'
import { ProgramRepository } from './types/program-repository.interface'
import { Program } from './entities/program.entity'
import { InMemoryProgramRepository } from './repositories/in-memory-program.repository'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('Program Service', () => {
  let programService: ProgramService
  let programRepository: ProgramRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmProgramRepository),
          useClass: InMemoryProgramRepository,
        },
        ProgramService,
      ],
    }).compile()

    programRepository = module.get<ProgramRepository>(
      getRepositoryToken(TypeOrmProgramRepository),
    )
    programService = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(programService).toBeDefined()
  })

  it('should create a program', async () => {
    const programTitle = 'Methode Lafay 3 semaines'
    const expectedProgram = {
      id: expect.any(String),
      title: programTitle,
    }

    programRepository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: programTitle,
    })

    const createdProgram = await programService.create(programTitle)

    expect(programRepository.save).toHaveBeenCalledWith({
      title: programTitle,
    })
    expect(createdProgram).toStrictEqual(expectedProgram)
  })

  it('should get all programs', async () => {
    const expectedPrograms = [new Program(), new Program()]

    const retrievedPrograms = await programService.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
