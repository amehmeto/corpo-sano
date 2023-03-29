import { DataSource } from 'typeorm'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Performance } from '../../src/performance/entities/performance.entity'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { generateFixtures } from './generate-fixtures'
import { DailyTask } from '../../src/daily-task/entities/daily-task.entity'
import { Session } from '../../src/session/entities/session.entity'
import * as env from 'env-var'
import { TypeOrmExerciseTemplateRepository } from '../../src/exercise/repositories/type-orm-exercise-template.repository'

async function exec() {
  console.log('Connection to DB')

  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: env.get('DB_PORT').default(3306).asPortNumber(),
    username: 'root',
    password: '',
    database: 'corposano',
    entities: [
      Athlete,
      Biometrics,
      DailyTask,
      Exercise,
      ExerciseTemplate,
      Program,
      Workout,
      Session,
      Performance,
      TypeOrmExerciseTemplateRepository,
    ],
    synchronize: true,
    //autoLoadEntities: false,
    //keepConnectionAlive: true,
  })

  console.log('Generating fixtures 💽')
  await generateFixtures(dataSource)

  console.log('Closing dataSource')
  await dataSource.close()
}

exec().then((r) => console.log(r))
