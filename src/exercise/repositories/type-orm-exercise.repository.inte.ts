import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TypeOrmExerciseRepository],
    }).compile()

    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = 'some real id from test DB' //TODO
    const expectedExercise = {
      id,
      title: 'Push up',
    }

    console.log(exerciseRepository)
    const foundExercise = await exerciseRepository.findById(id)

    expect(foundExercise).toStrictEqual(expectedExercise)
  })
})
