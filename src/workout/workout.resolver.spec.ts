import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { WORKOUT_REPOSITORY } from './types/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'

describe('Workout Resolver', () => {
  let workoutResolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: TypeOrmWorkoutRepository,
        },
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

    const createdWorkout = await workoutResolver.create(
      workoutInput.title,
      workoutInput.programId,
    )

    expect(workoutService.create).toHaveBeenCalledWith(workoutInput)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill workout with exercises', async () => {
    const fillWorkoutWithExerciseInput = {
      workoutId: Faker.datatype.uuid(),
      exercises: Array(3).fill(Faker.datatype.uuid()),
    }
    const expectedWorkout = {
      id: expect.any(String),
      title: 'Haut du bas',
      programId: expect.any(String),
      exercises: fillWorkoutWithExerciseInput.exercises,
    }

    workoutService.fillWorkoutWithExercise = jest
      .fn()
      .mockResolvedValue(expectedWorkout)

    const filledWorkout = await workoutResolver.fillWorkoutWithExercise(
      fillWorkoutWithExerciseInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })
})
