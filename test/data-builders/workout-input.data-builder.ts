import { workoutDataBuilder } from './workout.data-builder'
import * as Faker from 'faker'

export function workoutInputDataBuilder(workoutInput = {}) {
  const template = {
    ...workoutDataBuilder(),
    programId: Faker.datatype.uuid(),
  }
  delete template.id
  return { ...template, ...workoutInput }
}
