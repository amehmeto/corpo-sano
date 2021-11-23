import * as Faker from 'faker'

export function dailyTaskDataBuilder(dailTask = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    description: Faker.lorem.lines(1),
  }
  return { ...template, ...dailTask }
}
