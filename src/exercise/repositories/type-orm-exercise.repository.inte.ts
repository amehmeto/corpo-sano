import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Exercise } from '../entities/exercise.entity'
import { exerciseDataBuilder } from '../../../test/data-builders/exercise.data-builder'
import { workoutDataBuilder } from '../../../test/data-builders/workout.data-builder'
import { Workout } from '../../workout/entities/workout.entity'
import { WorkoutRepository } from '../../workout/repositories/workout-repository.interface'
import { exercisesTemplatesFixture } from '../../../test/generate.fixtures'

const exerciseFixture = new Exercise(exerciseDataBuilder())
const workoutFixture = new Workout(workoutDataBuilder())

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository
  let exerciseTemplateRepository: TypeOrmExerciseTemplateRepository
  let workoutRepository: WorkoutRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmWorkoutRepository,
          TypeOrmProgramRepository,
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
})
