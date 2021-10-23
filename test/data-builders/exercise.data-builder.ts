import * as Faker from 'faker'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { exerciseTemplateDataBuilder } from './exercise-template.data-builder'

export function exerciseDataBuilder(exercise = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    createAt: Faker.date.past(),
    template: new ExerciseTemplate(exerciseTemplateDataBuilder()),
    numberOfSets: 0,
    numberOfReps: 0,
    interSetsRestTime: 0,
    finalRestTime: 0,
  }
  return { ...template, ...exercise }
}
