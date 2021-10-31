import { Connection } from 'typeorm'
import { Athlete } from '../src/athlete/entities/athlete.entity'
import { athleteDataBuilder } from './data-builders/athlete.data-builder'
import { workoutDataBuilder } from './data-builders/workout.data-builder'
import { exerciseDataBuilder } from './data-builders/exercise.data-builder'
import { exerciseTemplateDataBuilder } from './data-builders/exercise-template.data-builder'
import { programDataBuilder } from './data-builders/program.data-builder'
import { TypeOrmExerciseRepository } from '../src/exercise/repositories/type-orm-exercise.repository'
import { TypeOrmWorkoutRepository } from '../src/workout/repositories/typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../src/program/repositories/type-orm-program.repository'
import { TypeOrmAthleteRepository } from '../src/athlete/repositories/typeorm-athlete.repository'
import { execSync } from 'child_process'
import * as Faker from 'faker'
import { INestApplication } from '@nestjs/common'

export const programFixture = programDataBuilder()
export const workoutFixture = workoutDataBuilder()
export const exercisesFixture = [
  exerciseDataBuilder({
    createAt: Faker.date.past(30),
    template: exerciseTemplateDataBuilder(),
  }),
  exerciseDataBuilder({
    createAt: Faker.date.past(3),
    template: exerciseTemplateDataBuilder(),
  }),
]
export const athleteFixture = new Athlete(athleteDataBuilder())

async function saveFixtures(
  connection: Connection,
  entityRepoFixturePair: any,
) {
  const [repository, fixture] = entityRepoFixturePair
  const customRepository = connection.getCustomRepository(repository)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await customRepository.save(fixture)
}

export async function generateFixtures(app: INestApplication) {
  const connection = app.get(Connection)
  const workout = {
    ...workoutFixture,
    exercises: exercisesFixture,
  }
  const program = {
    ...programFixture,
    workout: workout,
  }

  const entityRepositoryFixturePairs = [
    [TypeOrmExerciseRepository, exercisesFixture],
    [TypeOrmWorkoutRepository, workout],
    [TypeOrmProgramRepository, program],
    [TypeOrmAthleteRepository, athleteFixture],
  ]

  execSync('yarn db:seed')
  for (const pair of entityRepositoryFixturePairs)
    await saveFixtures(connection, pair)
}
