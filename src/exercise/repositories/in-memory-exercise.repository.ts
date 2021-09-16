import { ExerciseRepository } from '../types/exercise-repository.interface'
import { Exercise } from '../models/exercise.model'

export class InMemoryExerciseRepository implements ExerciseRepository {
  find(): Promise<Exercise[]> {
    return Promise.resolve([])
  }

  findById(id: string): Promise<Exercise> {
    return Promise.resolve(undefined)
  }
}
