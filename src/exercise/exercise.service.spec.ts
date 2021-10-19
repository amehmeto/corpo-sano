import { ExerciseService } from './exercise.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { InMemoryExerciseRepository } from './repositories/in-memory-exercise.repository'
import * as Faker from 'faker'
import { Exercise } from './entities/exercise.entity'
import { ExerciseRepository } from './types/exercise-repository.interface'
import { ExerciseTemplate } from './entities/exercise-template.entity'

describe('ExerciseService', () => {
  let exerciseService: ExerciseService
  let exerciseRepository: ExerciseRepository

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
    exerciseRepository = module.get<ExerciseRepository>(
      getRepositoryToken(TypeOrmExerciseRepository),
    )
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
    const exerciseId = exercise.id
    const expectedExercise = new Exercise({
      id: exerciseId,
      template: new ExerciseTemplate({ title: 'Jumping jacks' }),
    })

    const retrievedExercise = await exerciseService.getExercise(exerciseId)

    expect(retrievedExercise).toStrictEqual(expectedExercise)
  })
})
