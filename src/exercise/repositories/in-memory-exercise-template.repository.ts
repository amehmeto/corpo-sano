import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { ExerciseTemplateRepository } from '../types/exercise-template-repository.interface'
import * as Faker from 'faker'

export class InMemoryExerciseTemplateRepository
  implements ExerciseTemplateRepository
{
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
      new ExerciseTemplate({
        id: Faker.datatype.uuid(),
        title,
      }),
  )

  find(): Promise<ExerciseTemplate[]> {
    return Promise.resolve(this.exercises)
  }

  findById(id: string): Promise<ExerciseTemplate> {
    return Promise.resolve(
      this.exercises.find((exercise) => exercise.id === id),
    )
  }
}
