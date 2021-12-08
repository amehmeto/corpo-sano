import * as Faker from 'faker'
import { Session } from '../entities/session.entity'
import { Performance } from '../../performance/entities/performance.entity'

export const performanceFixture = performanceDataBuilder()
function performanceDataBuilder(performance = {}) {
  const template = {
    id: Faker.datatype.uuid(),
  }
  return { ...template, ...performance }
}

export function sessionDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    performance: new Performance(performanceDataBuilder()),
  }
  return { ...template, ...program }
}

export const sessionFixture = sessionDataBuilder()
export const sessionFixtures = [
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
]
