import * as Faker from 'faker'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { exerciseTemplateDataBuilder } from './exercise-template.data-builder'

export function exerciseDataBuilder(exercise = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    createdAt: Faker.date.past(),
    updatedAt: Faker.date.recent(),
    deletedAt: null as Date,
    version: Faker.datatype.number(10),
    template: new ExerciseTemplate(exerciseTemplateDataBuilder()),
    numberOfSets: 0,
    numberOfReps: 0,
    interSetsRestTime: 0,
    finalRestTime: 0,
  }
  return { ...template, ...exercise }
}
