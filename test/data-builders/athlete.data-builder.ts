import * as Faker from 'faker'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { biometricsDataBuilder } from './biometrics.data-builder'

export function athleteDataBuilder(athlete = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generated with "qwerty" password
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    email: Faker.internet.email(),
    password: hashedPassword,
    biometrics: new Biometrics(biometricsDataBuilder()),
  }

  return { ...template, ...athlete }
}
