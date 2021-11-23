import * as Faker from 'faker'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { exerciseTemplateDataBuilder } from './exercise-template.data-builder'

export function exerciseInputDataBuilder(exerciseInput = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    template: new ExerciseTemplate(exerciseTemplateDataBuilder()),
    numberOfSets: 0,
    numberOfReps: 0,
    interSetsRestTime: 0,
    finalRestTime: 0,
    position: 2,
  }
  return { ...template, ...exerciseInput }
}
