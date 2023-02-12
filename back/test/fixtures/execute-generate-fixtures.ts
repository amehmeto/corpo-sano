import { ConnectionOptions, createConnection } from 'typeorm'
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
;(async function () {
  console.log('Connection to DB')

  const connection = await createConnection({
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
    ],
    synchronize: true,
    autoLoadEntities: false,
    keepConnectionAlive: true,
  } as ConnectionOptions)

  console.log('Generating fixtures 💽')
  await generateFixtures(connection)

  console.log('Closing connection')
  await connection.close()
})()
