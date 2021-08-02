import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Program } from '../../program/entities/program.entity'
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
        TypeOrmModule.forFeature([TypeOrmWorkoutRepository, Program]),
      ],
    }).compile()

    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = '0ef7340f-49a0-4d50-9b6f-a155bab5fe7b'
    /*const expectedWorkout: Workout = {
      id,
      title: 'Lunge',
      program: new Program(),
      exercises: [],
    }*/

    const foundExercise = {} //await exerciseRepository.findById(id)

    expect(foundExercise) //.toStrictEqual(new Workout(expectedWorkout))
  })
})
