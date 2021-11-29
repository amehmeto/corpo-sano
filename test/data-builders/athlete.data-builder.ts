import * as Faker from 'faker'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { biometricsDataBuilder } from './biometrics.data-builder'
import { DailyTask } from '../../src/daily-task/entities/daily-task.entity'
import { dailyTaskDataBuilder } from '../../src/daily-task/data-builders/daily-task.data-builder'
import { programDataBuilder } from './program.data-builder'
import { Program } from '../../src/program/entities/program.entity'

export function athleteDataBuilder(athlete = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generated with "qwerty" password
  const template = {
    id: Faker.datatype.uuid(),
    name: Faker.name.firstName(),
    email: Faker.internet.email(),
    password: hashedPassword,
    biometrics: new Biometrics(biometricsDataBuilder()),
    dailyTasks: [
      new DailyTask(dailyTaskDataBuilder()),
      new DailyTask(dailyTaskDataBuilder()),
    ],
    programs: [new Program(programDataBuilder())],
  }

  return { ...template, ...athlete }
}
