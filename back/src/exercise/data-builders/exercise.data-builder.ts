import { faker as Faker } from '@faker-js/faker'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { exerciseTemplateDataBuilder } from './exercise-template.data-builder'
import { baseEntityDataBuilder } from '../../__infrastructure__/typeorm/base.data-builder'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'

export function exerciseDataBuilder(exercise = {}) {
  const baseEntity = baseEntityDataBuilder()
  const template = {
    ...baseEntity,
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
    id: HardCodedValuesEnum.exerciseId,
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
