import { ConnectionOptions, createConnection } from 'typeorm'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
import { generateFixtures } from './generate-fixtures'
;(async function () {
  console.log('Connection to DB')
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'corposano',
    entities: [
      ExerciseTemplate,
      Exercise,
      Athlete,
      Program,
      Workout,
      Biometrics,
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
