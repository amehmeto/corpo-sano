import { Inject, Injectable } from '@nestjs/common'
import { ExerciseTemplate } from './entities/exercise-template.entity'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from './repositories/exercise-template.repository.interface'

@Injectable()
export class ExerciseTemplateService {
  constructor(
    @Inject(EXERCISE_TEMPLATE_REPOSITORY)
    private readonly exerciseRepository: ExerciseTemplateRepository,
  ) {}

  getAllExerciseTemplates(): Promise<ExerciseTemplate[]> {
    return this.exerciseRepository.find()
  }
}
