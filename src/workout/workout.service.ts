import { Inject, Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { WorkoutInput } from './types/workout-input'
import { v4 as uuid } from 'uuid'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './types/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'

@Injectable()
export class WorkoutService {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async create(workoutInput: WorkoutInput): Promise<Workout> {
    const workout = new Workout({
      id: uuid(),
      title: workoutInput.title,
    })

    return this.workoutRepository.save(workout)
  }

  async fillWorkoutWithExercise(
    fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    return new Workout()
  }
}
