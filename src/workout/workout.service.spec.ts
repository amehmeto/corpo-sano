import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import { InMemoryExerciseTemplateRepository } from '../exercise/repositories/in-memory-exercise-template.repository'
import { InMemoryWorkoutRepository } from './repositories/in-memory-workout.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { Workout } from './entities/workout.entity'
import { WeekDays } from './types/week-days.enum'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { InMemoryExerciseRepository } from '../exercise/repositories/in-memory-exercise.repository'
import { ExerciseTemplateRepository } from '../exercise/repositories/exercise-template-repository.interface'
import { Exercise } from '../exercise/entities/exercise.entity'
import { workoutInputDataBuilder } from '../../test/data-builders/workout-input.data-builder'
import { WorkoutRepository } from './repositories/workout-repository.interface'
import { workoutDataBuilder } from '../../test/data-builders/workout.data-builder'

describe('Workout Service', () => {
  let workoutService: WorkoutService
  let workoutRepository: WorkoutRepository
  let exerciseTemplateRepository: ExerciseTemplateRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmWorkoutRepository),
          useClass: InMemoryWorkoutRepository,
        },
        {
          provide: getRepositoryToken(TypeOrmExerciseTemplateRepository),
          useClass: InMemoryExerciseTemplateRepository,
        },
        {
          provide: getRepositoryToken(TypeOrmExerciseRepository),
          useClass: InMemoryExerciseRepository,
        },
        WorkoutService,
      ],
    }).compile()

    workoutService = module.get<WorkoutService>(WorkoutService)
    workoutRepository = module.get<WorkoutRepository>(
      getRepositoryToken(TypeOrmWorkoutRepository),
    )
    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      getRepositoryToken(TypeOrmExerciseTemplateRepository),
    )
  })

  it('should be defined', () => {
    expect(workoutService).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = workoutInputDataBuilder()
    const expectedWorkout = new Workout({
      id: expect.any(String),
      title: workoutInput.title,
    })

    const createdWorkout = await workoutService.create(workoutInput)

    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill a workout with exercises', async () => {
    const exerciseTemplates = await exerciseTemplateRepository.find()
    const [workout] = await workoutRepository.find()
    const fillWorkoutWithExercisesInput = {
      workoutId: workout.id,
      exerciseTemplateIds: exerciseTemplates.map((exercise) => exercise.id),
    }
    const expectedExercises = await Promise.all(
      exerciseTemplates.map(async (template) => {
        return new Exercise({
          id: expect.any(String),
          template: await exerciseTemplateRepository.findById(template.id),
        })
      }),
    )
    const expectedWorkout = new Workout(
      workoutDataBuilder({
        id: fillWorkoutWithExercisesInput.workoutId,
        exercises: expectedExercises,
      }),
    )

    const filledWorkout = await workoutService.fillWorkoutWithExercises(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it("should get all workout's exercises", async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = [
      {
        workoutId,
      },
    ]

    const retrievedExercises = await workoutService.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const workoutId = Faker.datatype.uuid()
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const scheduleWorkoutInput = {
      workoutId,
      daysOfTheWeek,
    }
    const expectedWorkout = new Workout({
      id: workoutId,
      scheduledDays: daysOfTheWeek,
    })

    const scheduledWorkout = await workoutService.scheduleWorkout(
      scheduleWorkoutInput,
    )

    expect(scheduledWorkout).toStrictEqual(expectedWorkout)
  })
})
