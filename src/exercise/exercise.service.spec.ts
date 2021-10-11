import { ExerciseService } from './exercise.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { InMemoryExerciseRepository } from './repositories/in-memory-exercise.repository'
import * as Faker from 'faker'
import { Exercise } from './entities/exercise.entity'

describe('ExerciseService', () => {
  let exerciseService: ExerciseService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmExerciseRepository),
          useClass: InMemoryExerciseRepository,
        },
        ExerciseService,
      ],
    }).compile()

    exerciseService = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(exerciseService).toBeDefined()
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
      id: exerciseDetailsInput.exerciseId,
      ...exerciseDetailsInput,
    })

    const savedExercise = await exerciseService.saveDetails(
      exerciseDetailsInput,
    )

    expect(savedExercise).toStrictEqual(expectedExercise)
  })
})
