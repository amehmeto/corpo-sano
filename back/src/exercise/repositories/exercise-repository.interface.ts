import { Exercise } from '../entities/exercise.entity'
import { UpdateResult } from 'typeorm'

export const EXERCISE_REPOSITORY = 'EXERCISE_REPOSITORY'

export interface ExerciseRepository {
  find(): Promise<Exercise[]>
  findById(id: string): Promise<Exercise>
  save(exercise: Partial<Exercise>): Promise<Exercise>
  softDelete(id: string): Promise<UpdateResult>
}
