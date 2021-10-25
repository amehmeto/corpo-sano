import { ExerciseResolver } from './exercise.resolver'
import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseService } from './exercise.service'
import { Exercise } from './entities/exercise.entity'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { exerciseDetailsInputDataBuilder } from '../../test/data-builders/exercise-details-input.data-builder'
import { exerciseDataBuilder } from '../../test/data-builders/exercise.data-builder'

describe('ExerciseResolver', () => {
  let exerciseResolver: ExerciseResolver
  let exerciseService: ExerciseService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseResolver, ExerciseService, TypeOrmExerciseRepository],
    }).compile()

    exerciseResolver = module.get<ExerciseResolver>(ExerciseResolver)
    exerciseService = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(exerciseResolver).toBeDefined()
  })

  it("should save exercise's details", async () => {
    const exerciseDetailsInput = exerciseDetailsInputDataBuilder()
    const expectedExercise = new Exercise({
      ...exerciseDetailsInput,
      id: exerciseDetailsInput.exerciseId,
    })

    exerciseService.saveDetails = jest.fn().mockResolvedValue(expectedExercise)

    const savedExerciseDetails = await exerciseResolver.saveExerciseDetails(
      exerciseDetailsInput,
    )

    expect(exerciseService.saveDetails).toHaveBeenCalledWith(
      exerciseDetailsInput,
    )
    expect(savedExerciseDetails).toStrictEqual(expectedExercise)
  })

  it('should get an exercise by id', async () => {
    const exercise = new Exercise(exerciseDataBuilder())

    exerciseService.getExercise = jest.fn().mockResolvedValue(exercise)

    const retrievedExercise = await exerciseResolver.getExercise(exercise.id)

    expect(exerciseService.getExercise).toHaveBeenCalledWith(exercise.id)
    expect(retrievedExercise).toStrictEqual(exercise)
  })
})
