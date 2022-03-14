import * as Faker from 'faker'
import { exerciseFixtures } from '../../exercise/data-builders/exercise.data-builder'

export const performanceFixture = performanceDataBuilder({
  exercise: exerciseFixtures[0],
})

export function performanceDataBuilder(performance = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    sets: [
      Faker.datatype.number(10),
      Faker.datatype.number(10),
      Faker.datatype.number(10),
    ],
  }
  return { ...template, ...performance }
}
