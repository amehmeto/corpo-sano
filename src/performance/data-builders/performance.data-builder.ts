import * as Faker from 'faker'
import { baseEntityDataBuilder } from '../../__infrastructure__/typeorm/base.data-builder'

export const performanceFixture = performanceDataBuilder()

export function performanceDataBuilder(performance = {}) {
  const baseEntity = baseEntityDataBuilder()
  const template = {
    id: baseEntity.id,
    sets: [
      Faker.datatype.number(10),
      Faker.datatype.number(10),
      Faker.datatype.number(10),
    ],
  }
  return { ...template, ...performance }
}
