import { ExerciseResolver } from './exercise.resolver'
import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseService } from './exercise.service'
import * as Faker from 'faker'
import { Exercise } from './entities/exercise.entity'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'

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
    const exerciseDetailsInput = {
      exerciseId: Faker.datatype.uuid(),
      numberOfSets: Faker.datatype.number(),
      numberOfReps: Faker.datatype.number(),
      interSetsRestTime: Faker.datatype.number(),
      finalRestTime: Faker.datatype.number(),
    }
    const expectedExercise = new Exercise({
      ...exerciseDetailsInput,
      id: exerciseDetailsInput.exerciseId,
    })

    exerciseService.saveDetails = jest.fn().mockResolvedValue(expectedExercise)

    const savedExerciseDetails = await exerciseResolver.saveExerciseDetails(
      exerciseDetailsInput,
    )
    expect(savedExerciseDetails).toStrictEqual(expectedExercise)
  })
})
