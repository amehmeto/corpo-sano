import * as Faker from 'faker'
import { ExerciseRepository } from '../types/exercise-repository.interface'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseTemplate } from '../entities/exercise-template.entity'

export class InMemoryExerciseRepository implements ExerciseRepository {
  private exercisesData: string[] = ['wes']
  private exercises = this.exercisesData.map(
    (title: string) =>
      new Exercise({
        id: Faker.datatype.uuid(),
        template: new ExerciseTemplate({
          title,
        }),
      }),
  )

  find(): Promise<Exercise[]> {
    return Promise.resolve(this.exercises)
  }

  findById(id: string): Promise<Exercise> {
    return Promise.resolve(
      this.exercises.find((exercise) => exercise.id === id),
    )
  }
}
