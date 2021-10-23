import * as Faker from 'faker'

export function workoutDataBuilder(workout = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Bas du corps',
  }
  return { ...template, ...workout }
}
