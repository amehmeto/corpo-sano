import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Exercise } from './models/exercise.model'
import { ExerciseService } from './exercise.service'
import { ExerciseDetailsInput } from './types/exercise-details.input'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise, {
    name: 'saveExerciseDetails',
  })
  async saveExerciseDetails(
    @Args('payload') exerciseDetailsInput: ExerciseDetailsInput,
  ): Promise<Exercise> {
    return this.exerciseService.saveDetails(exerciseDetailsInput)
  }

  async getExercise(exerciseId: string): Promise<Exercise> {
    return this.exerciseService.getExercise(exerciseId)
  }
}
