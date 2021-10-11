import { Exercise } from '../entities/exercise.entity'

export interface ExerciseRepository {
  findById(id: string): Promise<Exercise>
}
