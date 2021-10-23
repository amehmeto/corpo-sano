import { Connection } from 'typeorm'
import { Program } from '../src/program/entities/program.entity'
import { Workout } from '../src/workout/entities/workout.entity'
import { Exercise } from '../src/exercise/entities/exercise.entity'
import * as Faker from 'faker'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'
import { Athlete } from '../src/athlete/entities/athlete.entity'
import { athleteDataBuilder } from './data-builders/athlete.data-builder'

export const programFixture = {
  id: Faker.datatype.uuid(),
  title: 'Mon programme',
}
export const workoutFixture = {
  id: Faker.datatype.uuid(),
  title: 'Mon Workout',
  program: {
    id: programFixture.id,
  },
  exercises: [] as Exercise[],
}
export const exercisesFixture = [
  new Exercise({
    id: Faker.datatype.uuid(),
    template: {
      id: '00000000-0000-0000-0000-000000000008',
      title: 'Lunge',
    },
  }),
  new Exercise({
    template: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Wall sit',
    },
  }),
]

export const athleteFixture = new Athlete(athleteDataBuilder())

async function insertFixture(
  connection: Connection,
  entity: any,
  fixture: any,
) {
  await connection
    .createQueryBuilder()
    .insert()
    .into(entity as EntityClassOrSchema)
    .values(fixture)
    .execute()
}

export async function generateFixtures(connection: Connection) {
  const entityFixturePairs = [
    [Program, programFixture],
    [Workout, workoutFixture],
    [Exercise, exercisesFixture[0]],
    [Exercise, exercisesFixture[1]],
    [Athlete, athleteFixture],
  ]

  for (const entityFixture of entityFixturePairs) {
    const [entity, fixture] = entityFixture
    await insertFixture(connection, entity, fixture)
  }
}

export async function deleteProgramAndWorkoutFixture(connection: Connection) {
  const entities = [Exercise, Workout, Program, Athlete]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
