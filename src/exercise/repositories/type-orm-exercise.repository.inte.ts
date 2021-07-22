import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { EXERCISE_REPOSITORY } from '../types/exercise-repository.interface'

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository
  beforeEach(async () => {
    const module = await Test.createTestingModule({}).compile()

    exerciseRepository =
      module.get<TypeOrmExerciseRepository>(EXERCISE_REPOSITORY)
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })
})
