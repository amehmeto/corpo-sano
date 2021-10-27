import * as Faker from 'faker'

export function programDataBuilder() {
  return {
    id: Faker.datatype.uuid(),
    title: 'Mon programme',
  }
}
