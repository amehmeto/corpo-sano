import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { Exercise } from '../../src/exercise/entities/exercise.entity'
import { Workout } from '../../src/workout/entities/workout.entity'
import { Program } from '../../src/program/entities/program.entity'
import { Athlete } from '../../src/athlete/entities/athlete.entity'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'

export async function deleteFixtures(connection: Connection) {
  const entities = [Exercise, ExerciseTemplate, Workout, Program, Athlete]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}

;(async function () {
  console.log('Deleting fixtures 🔥')
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
