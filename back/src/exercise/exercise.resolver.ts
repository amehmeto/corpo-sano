import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Exercise } from './models/exercise.model'
import { ExerciseService } from './exercise.service'
import { ExerciseDetailsInput } from './types/exercise-details.input'
import { GraphQLBoolean } from 'graphql'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query(() => Exercise)
  async getExercise(
    @Args({ name: 'exerciseId', type: () => ID }) exerciseId: string,
  ): Promise<Exercise> {
    return this.exerciseService.getExercise(exerciseId)
  }

  @Mutation(() => Exercise)
  async saveExerciseDetails(
    @Args('payload') exerciseDetailsInput: ExerciseDetailsInput,
  ): Promise<Exercise> {
    return this.exerciseService.saveDetails(exerciseDetailsInput)
  }

  @Mutation(() => GraphQLBoolean)
  async deleteExercise(
    @Args({ name: 'exerciseId', type: () => ID }) exerciseId: string,
  ): Promise<any> {
    await this.exerciseService.softDelete(exerciseId)
    return true
  }
}
