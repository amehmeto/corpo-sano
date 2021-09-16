import { Inject, Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { Exercise } from '../exercise/entities/exercise.entity'
import { WorkoutInput } from './types/workout-input'
import { v4 as uuid } from 'uuid'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './types/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../exercise/types/exercise-repository.interface'

@Injectable()
export class WorkoutService {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async create(workoutInput: WorkoutInput): Promise<Workout> {
    const workout = new Workout({
      id: uuid(),
      title: workoutInput.title,
    })
    return this.workoutRepository.save(workout)
  }

  async fillWorkoutWithExercises(
    fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    const { workoutId, exercisesId } = fillWorkoutWithExercisesInput

    console.log(this.workoutRepository)

    const workout = await this.workoutRepository.findById(workoutId)
    workout.exercises = await Promise.all(
      exercisesId.map(async (exerciseId) =>
        this.exerciseRepository.findById(exerciseId),
      ),
    )

    return this.workoutRepository.save(workout)
  }

  getExercises(workoutId: string): Promise<Exercise[]> {
    return this.workoutRepository.getExercises(workoutId)
  }
}
