import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { EXERCISE_REPOSITORY } from '../types/exercise-repository.interface'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TypeOrmExerciseRepository],
    }).compile()

    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      getRepositoryToken(TypeOrmExerciseRepository),
    )
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })
})
