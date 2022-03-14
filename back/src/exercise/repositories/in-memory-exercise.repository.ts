import { ExerciseRepository } from './exercise-repository.interface'
import { Exercise } from '../entities/exercise.entity'
import { exerciseDataBuilder } from '../data-builders/exercise.data-builder'
import { UpdateResult } from 'typeorm'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  softDelete(id: string): Promise<UpdateResult> {
    const softDeletedExercise = new UpdateResult()
    return Promise.resolve(softDeletedExercise)
  }
}
