import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Exercise } from './models/exercise.model'
import { ExerciseService } from './exercise.service'
import { ExerciseDetailsInput } from './types/exercise-details.input'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query(() => Exercise)
  async getExercise(
    @Args({ name: 'exerciseId', type: () => ID }) exerciseId: string,
  ): Promise<Exercise> {
    const temp = await this.exerciseService.getExercise(exerciseId)
    console.log(temp)
    return temp
  }

  @Mutation(() => Exercise)
  async saveExerciseDetails(
    @Args('payload') exerciseDetailsInput: ExerciseDetailsInput,
  ): Promise<Exercise> {
    return this.exerciseService.saveDetails(exerciseDetailsInput)
  }
}
