import { DataSource, Repository } from 'typeorm'
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

type EntityRepoFixturePair<T> = [Repository<T>, Repository<T>[]]

async function saveFixtures(
  dataSource: DataSource,
  entityRepoFixturePair: EntityRepoFixturePair<any>,
) {
  const [repository, fixture] = entityRepoFixturePair
  console.log('REPO', repository)
  const customRepository = dataSource.manager.withRepository(repository)
  console.log('C REPO', customRepository)
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

  const entityRepositoryFixturePairs: [any, any][] = [
    [TypeOrmExerciseTemplateRepository, exercisesTemplatesFixture],
    /*  [TypeOrmExerciseRepository, exerciseFixtures],
    [TypeOrmPerformanceRepository, performanceFixture],
    [TypeOrmSessionRepository, session],
    [TypeOrmWorkoutRepository, workouts],
    [TypeOrmProgramRepository, program],
    [TypeOrmProgramRepository, programFixtures],
    [TypeOrmBiometricsRepository, biometricsFixture],
    [TypeOrmDailyTaskRepository, dailyTaskFixtures],
    [TypeOrmAthleteRepository, athlete],*/
  ]

  for (const pair of entityRepositoryFixturePairs)
    await saveFixtures(dataSource, pair)
}
