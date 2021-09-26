import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from '../types/exercise-repository.interface'

export class InMemoryExerciseRepository implements ExerciseRepository {
  find(): Promise<Exercise[]> {
    return Promise.resolve([])
  }

  findById(id: string): Promise<Exercise> {
    return Promise.resolve(new Exercise({ id }))
  }
}
