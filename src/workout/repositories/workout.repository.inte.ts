import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Program } from '../../program/entities/program.entity'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'

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
        TypeOrmModule.forFeature([
          TypeOrmWorkoutRepository,
          TypeOrmExerciseRepository,
          TypeOrmProgramRepository,
          Exercise,
          Program,
        ]),
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
    const id = 'f1b25314-75fd-4508-ad90-de985b453e93'
    const expectedWorkout: Workout = {
      id,
      title: 'Mon Workout',
      exercises: [],
    }

    const foundExercise = await workoutRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })
})
