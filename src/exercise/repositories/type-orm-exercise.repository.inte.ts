import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../entities/exercise.entity'

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'corposano',
          entities: ['dist/**/*.entity{ .ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([TypeOrmExerciseRepository]),
      ],
    }).compile()

    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = '0ef7340f-49a0-4d50-9b6f-a155bab5fe7b'
    const expectedExercise: Exercise = {
      id,
      title: 'Lunge',
    }

    const foundExercise = await exerciseRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Exercise(expectedExercise))
  })
})