import * as Faker from 'faker'
import { UnitSystem } from '../../src/athlete/types/metric-system.enum'
import { Gender } from '../../src/athlete/types/gender.enum'
import { WeightGoal } from '../../src/athlete/types/weight-goal.enum'

const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

export function athleteDataBuilder(athlete = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generate with "qwerty"
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    bodyFat: Faker.datatype.number({ min: 0, max: 10000 }),
    height: Faker.datatype.number(),
    lengthUnit: Faker.random.arrayElement(unitSystem),
    weight: Faker.datatype.number(),
    weightUnit: Faker.random.arrayElement(unitSystem),
    gender: Faker.random.arrayElement(gender),
    birthday: Faker.date.past(20),
    weightGoal: Faker.random.arrayElement(weightGoal),
    email: Faker.internet.email(),
    password: hashedPassword,
  }
  template.birthday.setMilliseconds(0)
  return { ...template, ...athlete }
}
