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
import * as Faker from 'faker'
import { INestApplication } from '@nestjs/common'
import { ExerciseTemplate } from '../src/exercise/entities/exercise-template.entity'
import { TypeOrmExerciseTemplateRepository } from '../src/exercise/repositories/type-orm-exercise-template.repository'

export const programFixture = programDataBuilder()
export const workoutFixture = workoutDataBuilder()
export const exercisesFixture = [
  exerciseDataBuilder({
    position: 0,
    createdAt: Faker.date.past(30),
    deletedAt: null as Date,
    template: exerciseTemplateDataBuilder(),
  }),
  exerciseDataBuilder({
    position: 1,
    createdAt: Faker.date.past(3),
    template: exerciseTemplateDataBuilder(),
  }),
]
export const athleteFixture = new Athlete(athleteDataBuilder())
export const exercisesTemplatesFixture = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    title: 'Jumping jacks',
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Wall sit',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Push-up',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: 'Abdominal crunch',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: 'Squat',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    title: 'Triceps dip on chair',
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    title: 'Plank',
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    title: 'High knees running in place',
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    title: 'Lunge',
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    title: 'Push-up and rotation',
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    title: 'Side plank',
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    title: 'Jumping Rope',
  },
].map((exercise) => new ExerciseTemplate(exercise))

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
  const workouts = [
    {
      ...workoutFixture,
      exercises: exercisesFixture,
    },
  ]
  const program = {
    ...programFixture,
    workouts,
  }

  const entityRepositoryFixturePairs = [
    [TypeOrmExerciseTemplateRepository, exercisesTemplatesFixture],
    [TypeOrmExerciseRepository, exercisesFixture],
    [TypeOrmWorkoutRepository, workouts],
    [TypeOrmProgramRepository, program],
    [TypeOrmAthleteRepository, athleteFixture],
  ]

  for (const pair of entityRepositoryFixturePairs)
    await saveFixtures(connection, pair)
}
