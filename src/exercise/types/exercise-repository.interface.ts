import { Exercise } from '../entities/exercise.entity'

export const EXERCISE_REPOSITORY = 'ExerciseRepository'

export interface ExerciseRepository {
  find(): Promise<Exercise[]>
  findById(id: string): Promise<Exercise>
}
