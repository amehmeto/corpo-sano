import { faker as Faker } from '@faker-js/faker'
import { defaultExerciseTemplatesDataBuilder } from './default-exercise-templates.data-builder'
import { ExerciseTemplate } from '../entities/exercise-template.entity'

export function exerciseTemplateDataBuilder() {
  const defaultExerciseTemplatesNames = defaultExerciseTemplatesDataBuilder()
  return Faker.helpers.arrayElement(defaultExerciseTemplatesNames)
}

// TODO: clean this useless mess with faker-js
export const exercisesTemplatesFixture = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    title: 'Jumping jacks',
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Wall sit',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Push-up',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: 'Abdominal crunch',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: 'Squat',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    title: 'Triceps dip on chair',
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    title: 'Plank',
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    title: 'High knees running in place',
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    title: 'Lunge',
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    title: 'Push-up and rotation',
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    title: 'Side plank',
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    title: 'Jumping Rope',
  },
].map((exercise) => new ExerciseTemplate(exercise))
