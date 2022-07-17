import { UnitSystem } from './types/metric-system.enum'
import { Gender } from './types/gender.enum'
import { WeightGoal } from './types/weight-goal.enum'
import { faker } from '@faker-js/faker'

const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

function generateBodyFat() {
  const bodyFat = faker.datatype.number({ min: 80, max: 370 })
  const quotient = Math.floor(bodyFat / 10)
  const remainder = bodyFat % 10
  return `${quotient}.${remainder}`
}

export function biometricsDataBuilder(biometrics = {}) {
  const template = {
    bodyFat: generateBodyFat(),
    height: faker.datatype.number(),
    lengthUnit: Faker.helpers.arrayElement(unitSystem),
    weight: faker.datatype.number({ min: 60, max: 120 }),
    weightUnit: Faker.helpers.arrayElement(unitSystem),
    gender: Faker.helpers.arrayElement(gender),
    birthday: faker.date.past(20),
    weightGoal: Faker.helpers.arrayElement(weightGoal),
  }
  template.birthday.setMilliseconds(0)
  return { ...template, ...biometrics }
}
