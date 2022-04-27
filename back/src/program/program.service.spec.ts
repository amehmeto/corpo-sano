import { Test, TestingModule } from '@nestjs/testing'
import { ProgramService } from './program.service'
import { Program } from './entities/program.entity'
import { InMemoryProgramRepository } from './repositories/in-memory-program.repository'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from './repositories/program-repository.interface'
import { UpdateResult } from 'typeorm'
import { workoutDataBuilder, workoutFixture } from '../workout/data-builders/workout.data-builder'
import { Workout } from '../workout/entities/workout.entity'
import { workoutInputDataBuilder } from '../workout/data-builders/workout-input.data-builder'
import { programDataBuilder } from './data-builders/program.data-builder'

describe('Program Service', () => {
  let programService: ProgramService
  let programRepository: ProgramRepository

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
    programRepository = module.get<ProgramRepository>(PROGRAM_REPOSITORY)
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

  it('should get a program', async () => {
    const [expectedProgram] = await programRepository.find()

    const retrievedProgram = await programService.getProgram(expectedProgram.id)

    expect(retrievedProgram).toStrictEqual(expectedProgram)
  })

  it('should get all programs', async () => {
    const workouts = [new Workout(workoutFixture)]
    const expectedPrograms = [new Program(), new Program(), new Program({workouts})]

    const retrievedPrograms = await programService.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })

  it('should soft delete a program', async () => {
    const [program] = await programRepository.find()
    const expectedProgram = new UpdateResult()

    const softDeletedProgram = await programService.softDelete(program.id)

    expect(softDeletedProgram).toStrictEqual(expectedProgram)
  })

  it('should save workout to program', async () => {
    const { programId } = workoutInputDataBuilder()
    const workout = new Workout(workoutDataBuilder())
    const expectedProgram = programDataBuilder({
      id: programId,
      workouts: [workout],
    })

    const receivedProgram = await programRepository.saveWorkoutToProgram(
      programId,
      workout,
    )

    expect(receivedProgram.workouts).toStrictEqual(expectedProgram.workouts)
  })
})
