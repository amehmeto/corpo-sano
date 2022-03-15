import { faker } from '@faker-js/faker'
import { dailyTaskDataBuilder } from './daily-tasks.data-builder'
import { biometricsDataBuilder } from './biometrics.data-builder'
import { programDataBuilder } from './program.data-builder'

export function athleteDataBuilder(athlete = {}) {
  const hashedPassword =
    '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC' // generated with "qwerty" password
  const template = {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    password: hashedPassword,
    biometrics: biometricsDataBuilder(),
    dailyTasks: [
      dailyTaskDataBuilder({
        description: 'Create your first program',
        route: 'CreateProgram',
      }),
      dailyTaskDataBuilder({
        description: 'Perform your first workout',
        route: 'WorkoutPreview',
      }),
    ],
    programs: [programDataBuilder()],
  }

  return { ...template, ...athlete }
}
