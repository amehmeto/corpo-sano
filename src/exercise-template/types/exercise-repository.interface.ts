import { ExerciseTemplate } from '../entities/exercise-template.entity'

export interface ExerciseTemplateRepository {
  find(): Promise<ExerciseTemplate[]>
  findById(id: string): Promise<ExerciseTemplate>
}
