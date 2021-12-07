import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Exercise } from '../entities/exercise.entity'
import { exerciseDataBuilder } from '../data-builders/exercise.data-builder'
import { workoutDataBuilder } from '../../workout/data-builders/workout.data-builder'
import { Workout } from '../../workout/entities/workout.entity'
import { WorkoutRepository } from '../../workout/repositories/workout.repository.interface'
import { UpdateResult } from 'typeorm'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { exercisesTemplatesFixture } from '../data-builders/exercise-template.data-builder'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'

const exerciseFixture = new Exercise(exerciseDataBuilder())
const workoutFixture = new Workout(workoutDataBuilder())

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository
  let exerciseTemplateRepository: TypeOrmExerciseTemplateRepository
  let workoutRepository: WorkoutRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
          TypeOrmDailyTaskRepository,
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmProgramRepository,
          TypeOrmWorkoutRepository,
          TypeOrmSessionRepository,
        ]),
      ],
    }).compile()

    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )
    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )
    exerciseTemplateRepository = module.get<TypeOrmExerciseTemplateRepository>(
      TypeOrmExerciseTemplateRepository,
    )

    await exerciseTemplateRepository.save(exercisesTemplatesFixture)
    const exercise = await exerciseRepository.save(exerciseFixture)
    workoutFixture.exercises = [exercise]
    await workoutRepository.save(workoutFixture)
  })

  afterAll(async () => {
    await exerciseRepository.query(`DELETE FROM exercise;`)
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const expectedWorkout = {
      ...workoutFixture,
      exercises: [
        new Exercise({
          ...workoutFixture.exercises[0],
          updatedAt: expect.any(Date),
          version: expect.any(Number),
        }),
      ],
      updatedAt: expect.any(Date),
      version: expect.any(Number),
    }
    const expectedExercise = new Exercise({
      ...exerciseFixture,
      updatedAt: expect.any(Date),
      version: expect.any(Number),
      workout: new Workout(expectedWorkout),
    })

    const retrievedExercise = await exerciseRepository.findById(
      exerciseFixture.id,
    )

    expect(retrievedExercise).toStrictEqual(expectedExercise)
  })

  it('should soft-delete exercise', async () => {
    const expectedResponse = new UpdateResult()
    expectedResponse.affected = 1
    expectedResponse.raw = []

    const response = await exerciseRepository.softDelete(exerciseFixture.id)

    expect(response).toStrictEqual(expectedResponse)
  })
})
