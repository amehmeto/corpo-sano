import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Workout } from './models/workout.model'
import { WorkoutService } from './workout.service'

@Resolver()
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation((returns) => Workout, {
    name: 'create_workout',
  })
  async create(
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'programId', type: () => String }) programId: string,
  ) {
    const workoutInput = {
      title,
      programId,
    }
    return this.workoutService.create(workoutInput)
  }
}
