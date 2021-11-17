import { ExerciseService } from './exercise.service'
import { Test, TestingModule } from '@nestjs/testing'
import { InMemoryExerciseRepository } from './repositories/in-memory-exercise.repository'
import { Exercise } from './entities/exercise.entity'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from './repositories/exercise-repository.interface'
import { exerciseDetailsInputDataBuilder } from '../../test/data-builders/exercise-details-input.data-builder'

describe('ExerciseService', () => {
  let exerciseService: ExerciseService
  let exerciseRepository: ExerciseRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EXERCISE_REPOSITORY,
          useClass: InMemoryExerciseRepository,
        },
        ExerciseService,
      ],
    }).compile()

    exerciseService = module.get<ExerciseService>(ExerciseService)
    exerciseRepository = module.get<ExerciseRepository>(EXERCISE_REPOSITORY)
  })

  it('should be defined', () => {
    expect(exerciseService).toBeDefined()
  })

  it("should save exercise's details", async () => {
    const exerciseDetailsInput = exerciseDetailsInputDataBuilder()
    const expectedExercise = new Exercise({
      id: exerciseDetailsInput.exerciseId,
      numberOfSets: exerciseDetailsInput.numberOfSets,
      numberOfReps: exerciseDetailsInput.numberOfReps,
      interSetsRestTime: exerciseDetailsInput.interSetsRestTime,
      finalRestTime: exerciseDetailsInput.finalRestTime,
    })

    const savedExercise = await exerciseService.saveDetails(
      exerciseDetailsInput,
    )

    expect(savedExercise).toStrictEqual(expectedExercise)
  })

  it('should get an exercise by id', async () => {
    const [exercise] = await exerciseRepository.find()

    const retrievedExercise = await exerciseService.getExercise(exercise.id)

    expect(retrievedExercise).toStrictEqual(exercise)
  })
})
