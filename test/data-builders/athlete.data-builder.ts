import * as Faker from 'faker'
import { UnitSystem } from '../../src/athlete/types/metric-system.enum'
import { Gender } from '../../src/athlete/types/gender.enum'
import { WeightGoal } from '../../src/athlete/types/weight-goal.enum'

export function athleteDataBuilder(athlete = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    height: Faker.datatype.number(),
    lengthUnit: UnitSystem.METRIC,
    weight: Faker.datatype.number(),
    weightUnit: UnitSystem.METRIC,
    gender: Gender.FEMALE,
    birthday: Faker.date.past(1990),
    weightGoal: WeightGoal.SLOW_LOSS,
    email: Faker.internet.email(),
    password: Faker.random.alphaNumeric(),
  }
  return { ...template, ...athlete }
}
