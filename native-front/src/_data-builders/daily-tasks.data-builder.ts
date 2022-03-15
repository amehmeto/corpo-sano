import { faker } from '@faker-js/faker'
import { Routes } from '../routers/HomeRouter'

export function dailyTaskDataBuilder(dailTask = {}) {
  const template = {
    id: faker.datatype.uuid(),
    description: faker.lorem.lines(1),
    route: 'CreateProgram' as Routes,
  }
  return { ...template, ...dailTask }
}
