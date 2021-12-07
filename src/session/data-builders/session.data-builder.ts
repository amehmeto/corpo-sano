import * as Faker from 'faker'
import { Session } from '../entities/session.entity'

export function sessionDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
  }
  return { ...template, ...program }
}

export const sessionFixture = sessionDataBuilder()
export const sessionFixtures = [
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
]
