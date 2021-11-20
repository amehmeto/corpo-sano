import * as Faker from 'faker'
import { UnitSystem } from '../../src/biometrics/types/metric-system.enum'
import { Gender } from '../../src/biometrics/types/gender.enum'
import { WeightGoal } from '../../src/biometrics/types/weight-goal.enum'

const unitSystem = Object.values(UnitSystem)
const gender = Object.values(Gender)
const weightGoal = Object.values(WeightGoal)

export function registerAthleteInputDataBuilder(registerAthleteInput = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generate with "qwerty"
  const template = {
    name: Faker.name.firstName(),
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
  return { ...template, ...registerAthleteInput }
}
