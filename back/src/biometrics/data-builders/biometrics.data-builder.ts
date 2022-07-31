import { UnitSystem } from '../types/metric-system.enum'
import { Gender } from '../types/gender.enum'
import { WeightGoal } from '../types/weight-goal.enum'
import { faker as Faker } from '@faker-js/faker'
const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

export function biometricsDataBuilder(biometrics = {}) {
  const template = {
    bodyFat: Faker.datatype.number({ min: 5000, max: 12000 }),
    height: Faker.datatype.number(),
    lengthUnit: Faker.helpers.arrayElement(unitSystem),
    weight: Faker.datatype.number(),
    weightUnit: Faker.helpers.arrayElement(unitSystem),
    gender: Faker.helpers.arrayElement(gender),
    birthday: Faker.date.past(20),
    weightGoal: Faker.helpers.arrayElement(weightGoal),
  }
  template.birthday.setMilliseconds(0)
  return { ...template, ...biometrics }
}

export const biometricsFixture = biometricsDataBuilder()
