import { faker as Faker } from '@faker-js/faker'
import { biometricsDataBuilder } from '../../biometrics/data-builders/biometrics.data-builder'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'

export function registerAthleteInputDataBuilder(registerAthleteInput = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generate with "qwerty" as a password
  const template = {
    biometrics: new Biometrics(biometricsDataBuilder()),
    name: Faker.name.firstName(),
    email: Faker.internet.email(),
    password: hashedPassword,
  }
  return { ...template, ...registerAthleteInput }
}
