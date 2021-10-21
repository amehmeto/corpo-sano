import * as Faker from 'faker'
import { ExerciseRepository } from './exercise-repository.interface'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseTemplate } from '../entities/exercise-template.entity'

export class InMemoryExerciseRepository implements ExerciseRepository {
  private exerciseTemplates: string[] = [
    'Jumping jacks',
    'Wall sit',
    'Push-up',
    'Abdominal crunch',
    'Squat',
    'Triceps dip on chair',
    'Plank',
    'High knees running in place',
    'Lunge',
    'Push-up and rotation',
    'Side plank',
    'Jumping Rope',
  ]
  private exercises = this.exerciseTemplates.map(
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

  save(exercise: Partial<Exercise>): Promise<Exercise> {
    return Promise.resolve(new Exercise(exercise))
  }
}
