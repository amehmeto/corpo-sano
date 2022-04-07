import { workoutDataBuilder } from './workout.data-builder'
import { faker as Faker } from '@faker-js/faker'
export function workoutInputDataBuilder(workoutInput = {}) {
  const template = {
    ...workoutDataBuilder(),
    programId: Faker.datatype.uuid(),
  }
  delete template.id
  return { ...template, ...workoutInput }
}
