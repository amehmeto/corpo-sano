import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
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

  it('should find exercise by id', async () => {
    const id = 'some real id from test DB' //TODO
    const expectedExercise = {
      id,
      title: 'Pompes',
    }

    const foundExercise = await exerciseRepository.findById(id)

    expect(foundExercise).toStrictEqual(expectedExercise)
  })
})
