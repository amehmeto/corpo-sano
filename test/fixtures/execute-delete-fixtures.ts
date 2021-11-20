import { ConnectionOptions, createConnection } from 'typeorm'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { deleteFixtures } from './delete-fixtures'
;(async function () {
  console.log('Generating fixtures 💽')
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'corposano',
    entities: [ExerciseTemplate, Exercise, Athlete, Program, Workout],
    synchronize: true,
    autoLoadEntities: false,
    keepConnectionAlive: true,
  } as ConnectionOptions)
  await deleteFixtures(connection)
  await connection.close()
})()
