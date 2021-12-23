import * as Faker from 'faker'
import { Session } from '../entities/session.entity'
import { Performance } from '../../performance/entities/performance.entity'
import { performanceDataBuilder } from '../../performance/data-builders/performance.data-builder'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { exerciseDataBuilder } from '../../exercise/data-builders/exercise.data-builder'

export function sessionDataBuilder(session = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    performances: [
      new Performance(
        performanceDataBuilder({
          exercise: new Exercise(exerciseDataBuilder()),
        }),
      ),
    ],
  }
  return { ...template, ...session }
}

export const sessionFixture = new Session(sessionDataBuilder())
export const sessionFixtures = [
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
  new Session(sessionDataBuilder()),
]
