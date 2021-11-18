import { ExerciseRepository } from './exercise-repository.interface'
import { Exercise } from '../entities/exercise.entity'
import { exerciseDataBuilder } from '../../../test/data-builders/exercise.data-builder'

export class InMemoryExerciseRepository implements ExerciseRepository {
  private exercisesData = [
    exerciseDataBuilder(),
    exerciseDataBuilder(),
    exerciseDataBuilder(),
  ]
  private exercises = this.exercisesData.map(
    (exerciseData) => new Exercise(exerciseData),
  )

  find(): Promise<Exercise[]> {
    return Promise.resolve(this.exercises)
  }

  findById(id: string): Promise<Exercise> {
    return Promise.resolve(
      this.exercises.find((exercise) => exercise.id === id),
    )
  }

  save(exercise: Partial<Exercise>): Promise<Exercise> {
    return Promise.resolve(new Exercise(exercise))
  }

  softDelete(id: string): Promise<Exercise> {
    return Promise.resolve(
      this.exercises.find((exercise) => exercise.id === id),
    )
  }
}
