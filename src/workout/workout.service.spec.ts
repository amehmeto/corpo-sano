import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './types/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../exercise/types/exercise-repository.interface'

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
  let service: WorkoutService
  let workoutRepository: WorkoutRepository
  let exerciseRepository: ExerciseRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: TypeOrmWorkoutRepository,
        },
        {
          provide: EXERCISE_REPOSITORY,
          useValue: {},
        },
        WorkoutService,
      ],
    }).compile()

    service = module.get<WorkoutService>(WorkoutService)
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
    exerciseRepository = module.get<ExerciseRepository>(EXERCISE_REPOSITORY)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
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

    const createdProgram = await service.create(workoutInput)

    expect(workoutRepository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      title: workoutInput.title,
    })
    expect(createdProgram).toStrictEqual(expectedWorkout)
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

    const filledWorkout = await service.fillWorkoutWithExercise(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })
})
