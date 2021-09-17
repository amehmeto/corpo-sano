import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Program } from '../../program/entities/program.entity'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { config } from '../../../config'

describe('TypeOrm Workout Repository', () => {
  let workoutRepository: TypeOrmWorkoutRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
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

  beforeEach(async () => {
    await workoutRepository.insert({
      id: 'f1b25314-75fd-4508-ad90-de985b453e93',
      title: 'Mon Workout',
      exercises: [],
    })
  })

  afterEach(async () => {
    await workoutRepository.query('DELETE FROM workout')
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
