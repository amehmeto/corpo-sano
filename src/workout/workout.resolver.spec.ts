import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { WeekDays } from './types/week-days.enum'
import { Workout } from './entities/workout.entity'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { exerciseTemplateDataBuilder } from '../../test/data-builders/exercise-template.data-builder'

describe('Workout Resolver', () => {
  let workoutResolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmWorkoutRepository,
        TypeOrmExerciseTemplateRepository,
        TypeOrmExerciseRepository,
        WorkoutResolver,
        WorkoutService,
      ],
    }).compile()

    workoutResolver = module.get<WorkoutResolver>(WorkoutResolver)
    workoutService = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(workoutResolver).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = {
      id: expect.any(String),
      ...workoutInput,
    }

    workoutService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: expectedWorkout.title,
      programId: expectedWorkout.programId,
    })

    const createdWorkout = await workoutResolver.createWorkout(
      workoutInput.title,
      workoutInput.programId,
    )

    expect(workoutService.create).toHaveBeenCalledWith(workoutInput)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill workout with exercises', async () => {
    const exerciseTemplates = Array(3).fill(exerciseTemplateDataBuilder())
    const exercises = exerciseTemplates.map((template) => ({
      id: Faker.datatype.uuid(),
      template,
    }))
    const fillWorkoutWithExercisesInput = {
      workoutId: Faker.datatype.uuid(),
      exerciseTemplateIds: exerciseTemplates.map((exercise) => exercise.id),
    }
    const expectedWorkout = {
      id: expect.any(String),
      title: 'Haut du bas',
      programId: expect.any(String),
      exercises,
    }

    workoutService.fillWorkoutWithExercises = jest
      .fn()
      .mockResolvedValue(expectedWorkout)

    const filledWorkout = await workoutResolver.fillWorkoutWithExercises(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it('should get all workouts exercises', async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = Array(3).fill(exerciseTemplateDataBuilder())

    workoutService.getExercises = jest.fn().mockResolvedValue(expectedExercises)

    const retrievedExercises = await workoutResolver.getWorkoutExercises(
      workoutId,
    )

    expect(workoutService.getExercises).toHaveBeenCalled()
    expect(retrievedExercises).toBe(expectedExercises)
  })

  it('should schedule a workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.THURSDAY]
    const workoutId = Faker.datatype.uuid()
    const scheduleWorkoutInput = { workoutId, daysOfTheWeek }
    const expectedWorkout = new Workout({
      id: workoutId,
      scheduledDays: daysOfTheWeek,
    })

    workoutService.scheduleWorkout = jest
      .fn()
      .mockResolvedValue(expectedWorkout)

    const scheduledWorkout = await workoutResolver.scheduleWorkout(
      scheduleWorkoutInput,
    )

    expect(workoutService.scheduleWorkout).toHaveBeenCalledWith(
      scheduleWorkoutInput,
    )
    expect(scheduledWorkout).toStrictEqual(expectedWorkout)
  })
})
