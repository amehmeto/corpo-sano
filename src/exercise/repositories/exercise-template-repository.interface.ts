import { ExerciseTemplate } from '../entities/exercise-template.entity'

export const EXERCISE_TEMPLATE_REPOSITORY = 'EXERCISE_TEMPLATE_REPOSITORY'

export interface ExerciseTemplateRepository {
  find(): Promise<ExerciseTemplate[]>
  findById(id: string): Promise<ExerciseTemplate>
}
