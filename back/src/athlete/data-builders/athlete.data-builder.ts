import { faker as Faker } from '@faker-js/faker'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { biometricsDataBuilder } from '../../biometrics/data-builders/biometrics.data-builder'
import { DailyTask } from '../../daily-task/entities/daily-task.entity'
import { dailyTaskDataBuilder } from '../../daily-task/data-builders/daily-task.data-builder'
import { programDataBuilder } from '../../program/data-builders/program.data-builder'
import { Program } from '../../program/entities/program.entity'
import { Athlete } from '../entities/athlete.entity'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'

export function athleteDataBuilder(athlete = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generated with "qwerty" password
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    email: Faker.internet.email(),
    password: hashedPassword,
    avatar: Faker.image.avatar(),
    biometrics: new Biometrics(biometricsDataBuilder()),
    dailyTasks: [
      new DailyTask(dailyTaskDataBuilder()),
      new DailyTask(dailyTaskDataBuilder()),
    ],
    programs: [new Program(programDataBuilder())],
  }

  return { ...template, ...athlete }
}

export const athleteFixture = new Athlete(
  athleteDataBuilder({
    id: HardCodedValuesEnum.athleteId,
    email: HardCodedValuesEnum.athleteEmail,
    biometrics: biometricsDataBuilder(),
  }),
)
