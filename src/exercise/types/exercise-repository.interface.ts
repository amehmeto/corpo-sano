import { Exercise } from '../entities/exercise.entity'

export const EXERCISE_REPOSITORY = 'ExerciseRepository'

export interface ExerciseRepository {
  findById(id: string): Promise<Exercise>
}
