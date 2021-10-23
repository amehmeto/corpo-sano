import * as Faker from 'faker'
import { defaultExerciseTemplatesDataBuilder } from './default-exercise-templates.data-builder'

export function exerciseTemplateDataBuilder() {
  const defaultExerciseTemplatesNames = defaultExerciseTemplatesDataBuilder()
  return Faker.random.arrayElement(defaultExerciseTemplatesNames)
}
