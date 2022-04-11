import { faker as Faker } from '@faker-js/faker'
export function baseEntityDataBuilder(base = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    createdAt: Faker.date.past(),
    updatedAt: Faker.date.recent(),
    deletedAt: null as Date,
    version: Faker.datatype.number(5),
  }
  return { ...template, ...base }
}
