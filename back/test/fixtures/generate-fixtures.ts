import { DataSource, EntityTarget, Repository } from 'typeorm'
import { athleteFixture } from '../../src/athlete/data-builders/athlete.data-builder'
import { workoutFixture } from '../../src/workout/data-builders/workout.data-builder'
import { exerciseFixtures } from '../../src/exercise/data-builders/exercise.data-builder'
import {
  programFixture,
  programFixtures,
} from '../../src/program/data-builders/program.data-builder'
import { TypeOrmExerciseTemplateRepository } from '../../src/exercise/repositories/type-orm-exercise-template.repository'
import { biometricsFixture } from '../../src/biometrics/data-builders/biometrics.data-builder'
import { dailyTaskFixtures } from '../../src/daily-task/data-builders/daily-task.data-builder'
import { exercisesTemplatesFixture } from '../../src/exercise/data-builders/exercise-template.data-builder'
import { sessionFixture } from '../../src/session/data-builders/session.data-builder'
import { performanceFixture } from '../../src/performance/data-builders/performance.data-builder'
import { TypeOrmSessionRepository } from '../../src/session/repositories/session.typeorm.repository'
import { TypeOrmExerciseRepository } from '../../src/exercise/repositories/type-orm-exercise.repository'
import { TypeOrmDailyTaskRepository } from '../../src/daily-task/repositories/daily-task.typeorm.repository'
import { TypeOrmAthleteRepository } from '../../src/athlete/repositories/typeorm-athlete.repository'
import { TypeOrmProgramRepository } from '../../src/program/repositories/type-orm-program.repository'
import { TypeOrmBiometricsRepository } from '../../src/biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmPerformanceRepository } from '../../src/performance/repositories/performance.typeorm.repository'
import { TypeOrmWorkoutRepository } from '../../src/workout/repositories/workout.typeorm.repository'
import { ExerciseTemplate } from '../../src/exercise/entities/exercise-template.entity'

type EntityRepoFixturePair<T> = [EntityTarget<T>, InstanceType<any>[]]

async function saveFixtures(
  dataSource: DataSource,
  entityRepoFixturePair: EntityRepoFixturePair<any>,
) {
  const [repository, fixture] = entityRepoFixturePair
  console.log('REPO', repository)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const customRepository = dataSource.getRepository(repository)
  console.log('TON DARON LE TRANS', customRepository)
  await customRepository.save(fixture)
}

export async function generateFixtures(dataSource: DataSource) {
  const session = {
    ...sessionFixture,
    performances: [performanceFixture],
  }
  const workouts = [
    {
      ...workoutFixture,
      exercises: exerciseFixtures,
      sessions: [session],
    },
  ]
  const program = {
    ...programFixture,
    workouts,
  }
  const athlete = {
    ...athleteFixture,
    biometrics: biometricsFixture,
    programs: programFixtures,
    dailyTasks: dailyTaskFixtures,
  }

  const entityRepositoryFixturePairs: [EntityTarget<any>, any][] = [
    [ExerciseTemplate, exercisesTemplatesFixture],
    [TypeOrmExerciseRepository, exerciseFixtures],
    [TypeOrmPerformanceRepository, performanceFixture],
    [TypeOrmSessionRepository, session],
    [TypeOrmWorkoutRepository, workouts],
    [TypeOrmProgramRepository, program],
    [TypeOrmProgramRepository, programFixtures],
    [TypeOrmBiometricsRepository, biometricsFixture],
    [TypeOrmDailyTaskRepository, dailyTaskFixtures],
    [TypeOrmAthleteRepository, athlete],
  ]

  for (const pair of entityRepositoryFixturePairs)
    await saveFixtures(dataSource, pair)
}
