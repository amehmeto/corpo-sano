import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { WorkoutService } from './workout.service'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout, {
    name: 'createWorkout',
  })
  async create(
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'programId', type: () => ID }) programId: string,
  ): Promise<Workout> {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }

  @Mutation(() => Workout, {
    name: 'fillWorkoutWithExercises',
  })
  async fillWorkoutWithExercises(
    @Args('payload')
    payload: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    const result = await this.workoutService.fillWorkoutWithExercises(payload)
    return result
  }
}
