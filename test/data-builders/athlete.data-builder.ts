import * as Faker from 'faker'
import { UnitSystem } from '../../src/athlete/types/metric-system.enum'
import { Gender } from '../../src/athlete/types/gender.enum'
import { WeightGoal } from '../../src/athlete/types/weight-goal.enum'

const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

export function athleteDataBuilder(athlete = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    height: Faker.datatype.number(),
    lengthUnit: Faker.random.arrayElement(unitSystem),
    weight: Faker.datatype.number(),
    weightUnit: Faker.random.arrayElement(unitSystem),
    gender: Faker.random.arrayElement(gender),
    birthday: Faker.date.past(20),
    weightGoal: Faker.random.arrayElement(weightGoal),
    email: Faker.internet.email(),
    password: Faker.random.alphaNumeric(),
  }
  template.birthday.setMilliseconds(0)
  return { ...template, ...athlete }
}
