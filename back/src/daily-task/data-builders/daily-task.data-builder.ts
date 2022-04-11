import { faker as Faker } from '@faker-js/faker'
export function dailyTaskDataBuilder(dailTask = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    description: Faker.lorem.lines(1),
  }
  return { ...template, ...dailTask }
}

export const dailyTaskFixtures = [
  dailyTaskDataBuilder(),
  dailyTaskDataBuilder(),
  dailyTaskDataBuilder(),
]
