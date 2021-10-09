import { Query, Resolver } from '@nestjs/graphql'
import { ExerciseTemplateService } from './exercise-template.service'
import { ExerciseTemplate } from './models/exercise-template.model'

@Resolver(() => ExerciseTemplate)
export class ExerciseTemplateResolver {
  constructor(
    private readonly exerciseTemplateService: ExerciseTemplateService,
  ) {}

  @Query(() => [ExerciseTemplate])
  async getAllExerciseTemplates(): Promise<ExerciseTemplate[]> {
    return this.exerciseTemplateService.getAllExerciseTemplates()
  }
}
