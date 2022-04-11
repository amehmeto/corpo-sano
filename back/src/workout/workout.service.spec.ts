import { faker as Faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import { InMemoryExerciseTemplateRepository } from '../exercise/repositories/in-memory-exercise-template.repository'
import { InMemoryWorkoutRepository } from './repositories/in-memory-workout.repository'
import { Workout } from './entities/workout.entity'
import { WeekDays } from './types/week-days.enum'
import { InMemoryExerciseRepository } from '../exercise/repositories/in-memory-exercise.repository'
import { EXERCISE_TEMPLATE_REPOSITORY } from '../exercise/repositories/exercise-template-repository.interface'
import { workoutInputDataBuilder } from './data-builders/workout-input.data-builder'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './repositories/workout.repository.interface'
import { workoutDataBuilder } from './data-builders/workout.data-builder'
import { EXERCISE_REPOSITORY } from '../exercise/repositories/exercise-repository.interface'
import { UpdateResult } from 'typeorm'

describe('Workout Service', () => {
  let workoutService: WorkoutService
  let workoutRepository: WorkoutRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: InMemoryWorkoutRepository,
        },
        {
          provide: EXERCISE_TEMPLATE_REPOSITORY,
          useClass: InMemoryExerciseTemplateRepository,
        },
        {
          provide: EXERCISE_REPOSITORY,
          useClass: InMemoryExerciseRepository,
        },
        WorkoutService,
      ],
    }).compile()

    workoutService = module.get<WorkoutService>(WorkoutService)
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
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

  it('should get a workout by id', async () => {
    const [expectedWorkout] = await workoutRepository.find()

    const retrievedWorkout = await workoutService.getById(expectedWorkout.id)

    expect(retrievedWorkout).toStrictEqual(expectedWorkout)
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

  it('should update a workout', async () => {
    const [workout] = await workoutRepository.find()
    const exercises = workout.exercises
    const tempSwap = exercises[0]
    exercises[0] = exercises[1]
    exercises[1] = tempSwap
    const newWorkout = new Workout(
      workoutDataBuilder({
        title: 'new title',
        exercises,
      }),
    )
    const expectedWorkout = newWorkout

    const updatedWorkout = await workoutService.update(newWorkout)

    expect(updatedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should patch a workout', async () => {
    const [workout] = await workoutRepository.find()
    const newPartialWorkout = {
      title: 'Training legs instead arms now',
    }
    const expectedWorkout = new Workout({
      ...workout,
      ...newPartialWorkout,
    })

    const patchedWorkout = await workoutService.patch(
      workout.id,
      newPartialWorkout,
    )

    expect(patchedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should soft delete a workout', async () => {
    const [workout] = await workoutRepository.find()
    let expectedWorkout = new UpdateResult()

    const softDeletedWorkout = await workoutService.softDelete(workout.id)

    expect(softDeletedWorkout).toStrictEqual(expectedWorkout)
  })
})
