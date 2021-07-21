import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
import { Exercise } from 'src/exercise/types/exercise.type'
import { Workout } from './models/workout.model'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises-input'
import { WorkoutService } from './workout.service'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation((returns) => Workout, {
    name: 'createWorkout',
  })
  async create(
    @Args({ name: 'title', type: () => ID }) title: string,
    @Args({ name: 'programId', type: () => String }) programId: string,
  ): Promise<Workout> {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }

  @Mutation((returns) => Workout, {
    name: 'fillWorkoutWithExercise'
  })
  async fillWorkoutWithExercise(
    @Args('payload') fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    return this.workoutService.fillWorkoutWithExercise(fillWorkoutWithExercisesInput)
  }
}
