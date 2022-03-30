import { Test, TestingModule } from '@nestjs/testing'
import { ProgramService } from './program.service'
import { Program } from './entities/program.entity'
import { InMemoryProgramRepository } from './repositories/in-memory-program.repository'
import { PROGRAM_REPOSITORY } from './repositories/program-repository.interface'
import { programFixtures } from './data-builders/program.data-builder'
import { Athlete } from '../athlete/entities/athlete.entity'

describe('Program Service', () => {
  let programService: ProgramService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PROGRAM_REPOSITORY,
          useClass: InMemoryProgramRepository,
        },
        ProgramService,
      ],
    }).compile()

    programService = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(programService).toBeDefined()
  })

  it('should create a program', async () => {
    const programTitle = 'Methode Lafay 3 semaines'
    const expectedProgram = new Program({
      id: expect.any(String),
      title: programTitle,
    })

    const createdProgram = await programService.create(programTitle)

    expect(createdProgram).toStrictEqual(expectedProgram)
  })

  it('should get program', async () => {
    const programId = programFixtures[0].id
    const expectedProgram = {
      id: programId,
      title: expect.any(String),
      workouts: expect.arrayContaining([]),
    }

    const retrievedProgram = await programService.getProgram(programId)

    expect(retrievedProgram).toStrictEqual(expectedProgram)
  })

  it('should get all programs', async () => {
    const expectedPrograms = [new Program(), new Program()]

    const retrievedPrograms = await programService.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
