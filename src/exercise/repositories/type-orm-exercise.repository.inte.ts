import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../entities/exercise.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Program } from '../../program/entities/program.entity'

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
        TypeOrmModule.forFeature([
          TypeOrmExerciseRepository,
          TypeOrmWorkoutRepository,
          TypeOrmProgramRepository,
          Program,
          Workout,
        ]),
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
    const id = 'd3f3e8a8-d021-44a4-a6c9-caec202ccb1d'
    const expectedExercise: Exercise = {
      id,
      title: 'Squat',
    }

    const foundExercise = await exerciseRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Exercise(expectedExercise))
  })
})
