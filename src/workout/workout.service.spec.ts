import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import { WorkoutRepository } from './types/workout-repository.interface'
import { ExerciseRepository } from '../exercise/types/exercise-repository.interface'
import { InMemoryExerciseRepository } from '../exercise/repositories/in-memory-exercise.repository'
import { InMemoryWorkoutRepository } from './repositories/in-memory-workout.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { Workout } from './entities/workout.entity'
import { WeekDays } from './types/week-days.enum'

const exerciseTitles = ['pompes', 'dips', 'tractions', 'abdos']

function exercisesDataBuilder() {
  return [
    {
      id: Faker.datatype.uuid(),
      title: Faker.random.arrayElement(exerciseTitles),
    },
    {
      id: Faker.datatype.uuid(),
      title: Faker.random.arrayElement(exerciseTitles),
    },
    {
      id: Faker.datatype.uuid(),
      title: Faker.random.arrayElement(exerciseTitles),
    },
  ]
}

describe('Workout Service', () => {
  let workoutService: WorkoutService
  let workoutRepository: WorkoutRepository
  let exerciseRepository: ExerciseRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmWorkoutRepository),
          useClass: InMemoryWorkoutRepository,
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
    exerciseRepository = module.get<ExerciseRepository>(
      getRepositoryToken(TypeOrmExerciseRepository),
    )
  })

  it('should be defined', () => {
    expect(workoutService).toBeDefined()
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

    workoutRepository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      ...workoutInput,
    })

    const createdWorkout = await workoutService.create(workoutInput)

    expect(workoutRepository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      title: workoutInput.title,
    })
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill a workout with exercises', async () => {
    const exercises = exercisesDataBuilder()
    const fillWorkoutWithExercisesInput = {
      workoutId: Faker.datatype.uuid(),
      exercisesId: exercises.map((exercise) => exercise.id),
    }
    const retrievedWorkout = {
      id: expect.any(String),
      title: 'Haut du bas',
      programId: expect.any(String),
    }
    const expectedWorkout = {
      ...retrievedWorkout,
      exercises: exercises,
    }

    workoutRepository.findById = jest.fn().mockResolvedValue(retrievedWorkout)
    workoutRepository.save = jest
      .fn()
      .mockImplementation((receivedWorkout) => receivedWorkout)
    exerciseRepository.findById = jest.fn().mockImplementation((exerciseId) => {
      const [exercise] = exercises.filter(
        (exercise) => exercise.id === exerciseId,
      )
      return exercise
    })

    const filledWorkout = await workoutService.fillWorkoutWithExercises(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it("should get all workout's exercises", async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = [
      {
        id: expect.any(String),
        title: 'Push ups',
      },
    ]

    const retrievedExercises = await workoutService.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const expectedWorkout = new Workout({
      scheduledDays: daysOfTheWeek,
    })

    const scheduledWorkout = await workoutService.scheduleWorkout(daysOfTheWeek)

    expect(scheduledWorkout).toStrictEqual(expectedWorkout)
  })
})
