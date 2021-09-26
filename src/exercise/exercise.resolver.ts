import { Query, Resolver } from '@nestjs/graphql'
import { ExerciseService } from './exercise.service'
import { Exercise } from './models/exercise.model'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query(() => [Exercise])
  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseService.getAllExercises()
  }
}
