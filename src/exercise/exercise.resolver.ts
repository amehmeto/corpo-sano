import { Resolver } from '@nestjs/graphql'
import { ExerciseService } from './exercise.service'
import { Exercise } from './models/exercise.model'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}
  async getAllExercises(): Promise<any> {
    return this.exerciseService.getAllExercises()
  }
}
