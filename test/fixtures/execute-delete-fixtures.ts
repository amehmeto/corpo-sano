import { ConnectionOptions, createConnection } from 'typeorm'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { deleteFixtures } from './delete-fixtures'
import { Biometrics } from '../../src/biometrics/entities/biometrics.entity'
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
      Athlete,
      Biometrics,
      Exercise,
      ExerciseTemplate,
      Program,
      Workout,
    ],
    synchronize: true,
    autoLoadEntities: true,
    keepConnectionAlive: true,
  } as ConnectionOptions)
  console.log('Deleting fixtures 🔥')
  await deleteFixtures(connection)
  console.log('Closing connection')
  await connection.close()
})()
