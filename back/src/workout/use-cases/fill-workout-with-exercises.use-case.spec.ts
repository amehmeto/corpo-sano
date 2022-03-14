import { Test, TestingModule } from '@nestjs/testing'
import { FillWorkoutWithExercisesUseCase } from './fill-workout-with-exercises.use-case'
import { EXERCISE_REPOSITORY } from '../../exercise/repositories/exercise-repository.interface'
import { InMemoryExerciseTemplateRepository } from '../../exercise/repositories/in-memory-exercise-template.repository'
import { InMemoryExerciseRepository } from '../../exercise/repositories/in-memory-exercise.repository'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../repositories/workout.repository.interface'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from '../../exercise/repositories/exercise-template-repository.interface'
import { workoutDataBuilder } from '../data-builders/workout.data-builder'
import { InMemoryWorkoutRepository } from '../repositories/in-memory-workout.repository'
import { Workout } from '../entities/workout.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'

describe('FillWorkoutWithExercises UseCase', () => {
  let fillWorkoutWithExercisesUseCase: FillWorkoutWithExercisesUseCase
  let workoutRepository: WorkoutRepository
  let exerciseTemplateRepository: ExerciseTemplateRepository

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
        FillWorkoutWithExercisesUseCase,
      ],
    }).compile()

    fillWorkoutWithExercisesUseCase =
      module.get<FillWorkoutWithExercisesUseCase>(
        FillWorkoutWithExercisesUseCase,
      )
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      EXERCISE_TEMPLATE_REPOSITORY,
    )
  })

  it('should be defined', () => {
    expect(fillWorkoutWithExercisesUseCase).toBeDefined()
  })

  it('should fill a workout with exercises', async () => {
    const exerciseTemplates = await exerciseTemplateRepository.find()
    const [workout] = await workoutRepository.find()
    const fillWorkoutWithExercisesInput = {
      workoutId: workout.id,
      exerciseTemplateIds: exerciseTemplates.map((exercise) => exercise.id),
    }
    const expectedExercises = await Promise.all(
      exerciseTemplates.map(async (template, index) => {
        return new Exercise({
          id: expect.any(String),
          position: index,
          template: await exerciseTemplateRepository.findById(template.id),
        })
      }),
    )
    const expectedWorkout = new Workout(
      workoutDataBuilder({
        id: fillWorkoutWithExercisesInput.workoutId,
        exercises: expectedExercises,
        sessions: workout.sessions,
      }),
    )

    const filledWorkout = await fillWorkoutWithExercisesUseCase.execute(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })
})
