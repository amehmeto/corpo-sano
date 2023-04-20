import { Inject, Injectable } from '@nestjs/common'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../repositories/workout.repository.interface'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from '../../exercise/repositories/exercise-template.repository.interface'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../../exercise/repositories/exercise-repository.interface'
import { FillWorkoutWithExercisesInput } from '../types/fill-workout-with-exercises.input'
import { Workout } from '../entities/workout.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { v4 as uuid } from 'uuid'

@Injectable()
export class FillWorkoutWithExercisesUseCase {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
    @Inject(EXERCISE_TEMPLATE_REPOSITORY)
    private readonly exerciseTemplateRepository: ExerciseTemplateRepository,
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async execute(
    fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    const { workoutId, exerciseTemplateIds } = fillWorkoutWithExercisesInput

    const workout = await this.workoutRepository.findById(workoutId)
    workout.exercises = await Promise.all(
      exerciseTemplateIds.map(
        async (exerciseId, index) =>
          await this.hydrateExercise(exerciseId, index),
      ),
    )
    return this.workoutRepository.save(workout)
  }

  private async hydrateExercise(exerciseId: string, index: number) {
    const template = await this.exerciseTemplateRepository.findById(exerciseId)
    const exercise = new Exercise({ id: uuid(), position: index, template })
    return this.exerciseRepository.save(exercise)
  }
}
