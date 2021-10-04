import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseService } from './exercise.service'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { ExerciseRepository } from './types/exercise-repository.interface'
import { getRepositoryToken } from '@nestjs/typeorm'
import { InMemoryExerciseRepository } from './repositories/in-memory-exercise.repository'

describe('ExerciseService', () => {
  let exerciseService: ExerciseService
  let exerciseRepository: ExerciseRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmExerciseRepository),
          useClass: InMemoryExerciseRepository,
        },
        ExerciseService,
      ],
    }).compile()

    exerciseRepository = module.get<ExerciseRepository>(
      getRepositoryToken(TypeOrmExerciseRepository),
    )
    exerciseService = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(exerciseService).toBeDefined()
  })

  it('should get all exercises', async () => {
    const expectedExercises = await exerciseRepository.find()

    const fetchedExercises = await exerciseService.getAllExercises()

    expect(fetchedExercises).toEqual(expectedExercises)
  })
})
