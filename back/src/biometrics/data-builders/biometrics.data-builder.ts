import { UnitSystem } from '../types/metric-system.enum'
import { Gender } from '../types/gender.enum'
import { WeightGoal } from '../types/weight-goal.enum'
import * as Faker from 'faker'

const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

export function biometricsDataBuilder(biometrics = {}) {
  const template = {
    bodyFat: Faker.datatype.number({ min: 0, max: 10000 }),
    height: Faker.datatype.number(),
    lengthUnit: Faker.random.arrayElement(unitSystem),
    weight: Faker.datatype.number(),
    weightUnit: Faker.random.arrayElement(unitSystem),
    gender: Faker.random.arrayElement(gender),
    birthday: Faker.date.past(20),
    weightGoal: Faker.random.arrayElement(weightGoal),
  }
  template.birthday.setMilliseconds(0)
  return { ...template, ...biometrics }
}

export const biometricsFixture = biometricsDataBuilder()
