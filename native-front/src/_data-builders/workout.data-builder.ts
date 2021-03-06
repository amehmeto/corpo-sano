import { faker } from '@faker-js/faker'
import { scheduledDaysDataBuilder } from './scheduled-days.data-builder'

export function workoutDataBuilder(workout = {}) {
  const titleExamples = ['Upper body', 'Legs', 'Pull workout', 'Cardio']
  const template = {
    id: faker.datatype.uuid(),
    title: faker.helpers.arrayElement(titleExamples),
    description: faker.lorem.paragraph(),
    programId: faker.datatype.uuid(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    exercises: [],
    scheduledDays: scheduledDaysDataBuilder(),
  }
  return {
    ...template,
    ...workout,
  }
}
