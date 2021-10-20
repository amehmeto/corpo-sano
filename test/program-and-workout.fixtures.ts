import { Connection } from 'typeorm'
import { Program } from '../src/program/entities/program.entity'
import { Workout } from '../src/workout/entities/workout.entity'
import { Exercise } from '../src/exercise/entities/exercise.entity'
import * as Faker from 'faker'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'

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

export async function programAndWorkoutFixtures(connection: Connection) {
  const entityFixturePairs = [
    [Program, programFixture],
    [Workout, workoutFixture],
    [Exercise, exercisesFixture[0]],
    [Exercise, exercisesFixture[1]],
  ]

  for (const entityFixture of entityFixturePairs) {
    const [entity, fixture] = entityFixture
    await insertFixture(connection, entity, fixture)
  }
}

function generateExercisesWithHardCodedUuid(defaultExercisesNames: string[]) {
  const defaultExercises = []
  for (let i = 0; defaultExercisesNames[i]; i++) {
    const baseUuid = '00000000-0000-0000-0000-000000000000'
    const stringifiedIndex = i.toString()
    const exercise = {
      id: baseUuid.slice(0, -stringifiedIndex.length) + stringifiedIndex,
      title: defaultExercisesNames[i],
    }
    defaultExercises.push(exercise)
  }
  return defaultExercises
}

export function defaultExercisesDataBuilder() {
  const defaultExercisesNames = [
    'Jumping jacks',
    'Wall sit',
    'Push-up',
    'Abdominal crunch',
    'Squat',
    'Triceps dip on chair',
    'Plank',
    'High knees running in place',
    'Lunge',
    'Push-up and rotation',
    'Side plank',
    'Jumping Rope',
  ]
  return generateExercisesWithHardCodedUuid(defaultExercisesNames)
}

export async function deleteProgramAndWorkoutFixture(connection: Connection) {
  const entities = [Exercise, Workout, Program]
  for (const entity of entities)
    await connection.createQueryBuilder().delete().from(entity).execute()
}
