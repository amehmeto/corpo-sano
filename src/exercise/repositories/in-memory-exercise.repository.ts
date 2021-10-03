import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from '../types/exercise-repository.interface'
import * as Faker from 'faker'

export class InMemoryExerciseRepository implements ExerciseRepository {
  private exercisesTitles = [
    'Lunge',
    'Wall sit',
    'High knees running in place',
    'Jumping jacks',
    'Push-up and rotation',
    'Abdominal crunch',
    'Side plank',
    'Push-up',
    'Plank',
    'Squat',
    'Triceps dip on chair',
  ]
  private exercises = this.exercisesTitles.map(
    (title: string) =>
      new Exercise({
        id: Faker.datatype.uuid(),
        title,
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
