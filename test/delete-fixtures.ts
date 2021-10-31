import { Connection } from 'typeorm'
import { Exercise } from '../src/exercise/entities/exercise.entity'
import { Workout } from '../src/workout/entities/workout.entity'
import { Program } from '../src/program/entities/program.entity'
import { Athlete } from '../src/athlete/entities/athlete.entity'
import { INestApplication } from '@nestjs/common'

export async function deleteFixtures(app: INestApplication) {
  const connection = app.get(Connection)
  const entities = [Exercise, Workout, Program, Athlete]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
