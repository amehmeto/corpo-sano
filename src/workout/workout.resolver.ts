import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { WorkoutService } from './workout.service'
import { Exercise } from '../exercise/models/exercise.model'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Query(() => [Exercise])
  async getWorkoutExercises(
    @Args({ name: 'workoutId', type: () => ID }) workoutId: string,
  ): Promise<Exercise[]> {
    return this.workoutService.getExercises(workoutId)
  }

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

  @Mutation(() => Workout)
  async fillWorkoutWithExercises(
    @Args('payload')
    payload: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    return this.workoutService.fillWorkoutWithExercises(payload)
  }

  @Mutation(() => Workout)
  async scheduleWorkout(
    @Args({ name: 'payload', type: () => ScheduleWorkoutInput })
    payload: ScheduleWorkoutInput,
  ): Promise<Workout> {
    return this.workoutService.scheduleWorkout(payload)
  }
}
