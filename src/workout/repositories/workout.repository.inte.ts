import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Program } from '../../program/entities/program.entity'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './workout.repository'

describe('TypeOrm Workout Repository', () => {
  let workoutRepository: TypeOrmWorkoutRepository

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
        TypeOrmModule.forFeature([TypeOrmWorkoutRepository, Exercise, Program]),
      ],
    }).compile()

    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const id = 'a5e5b221-2bb9-496f-80dc-3aebe29ce4ef'
    const expectedWorkout: Workout = {
      id,
      title: 'Mon Workout',
    }

    const foundExercise = await workoutRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })
})
