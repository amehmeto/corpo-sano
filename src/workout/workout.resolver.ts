import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { WorkoutService } from './workout.service'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation((returns) => Workout, {
    name: 'createWorkout',
  })
  async create(
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'programId', type: () => String }) programId: string,
  ): Promise<Workout> {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }

  async fillWith(exercices: string[]): Promise<Workout> {
    return undefined
  }
}
