import * as Faker from 'faker'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { exerciseTemplateDataBuilder } from './exercise-template.data-builder'

export function exerciseDataBuilder(exercise = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    createdAt: Faker.date.past(),
    updatedAt: Faker.date.recent(),
    deletedAt: null as Date,
    version: Faker.datatype.number(10),
    template: new ExerciseTemplate(exerciseTemplateDataBuilder()),
    position: Faker.datatype.number({ min: 0, max: 10 }),
    numberOfSets: 0,
    numberOfReps: 0,
    interSetsRestTime: 0,
    finalRestTime: 0,
  }
  return { ...template, ...exercise }
}

export const exerciseFixtures = [
  exerciseDataBuilder({
    position: 0,
    createdAt: Faker.date.past(30),
    deletedAt: null as Date,
    template: exerciseTemplateDataBuilder(),
  }),
  exerciseDataBuilder({
    position: 1,
    createdAt: Faker.date.past(0),
    template: exerciseTemplateDataBuilder(),
  }),
]
