import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { config } from '../../../config'
import { TypeOrmAthleteRepository } from './typeorm-athlete.repository'
import { Athlete } from '../entities/athlete.entity'
import { athleteDataBuilder } from '../data-builders/athlete.data-builder'
import { RepositoryErrors } from '../types/repository-errors.enum'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { biometricsDataBuilder } from '../../biometrics/data-builders/biometrics.data-builder'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { DailyTask } from '../../daily-task/entities/daily-task.entity'
import { dailyTaskDataBuilder } from '../../daily-task/data-builders/daily-task.data-builder'
import { Program } from '../../program/entities/program.entity'
import { programDataBuilder } from '../../program/data-builders/program.data-builder'
import { expectedBaseEntity } from '../../__infrastructure__/typeorm/expected-base-entity.data-builder'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'

const programFixtures = [
  new Program(programDataBuilder()),
  new Program(programDataBuilder()),
]
const dailyTaskFixtures = [
  new DailyTask(dailyTaskDataBuilder()),
  new DailyTask(dailyTaskDataBuilder()),
]
const biometricsFixture = new Biometrics(biometricsDataBuilder())
const athleteFixture = new Athlete(athleteDataBuilder())

describe('TypeOrmAthleteRepository', () => {
  let athleteRepository: TypeOrmAthleteRepository
  let biometricsRepository: TypeOrmBiometricsRepository
  let dailyTaskRepository: TypeOrmDailyTaskRepository
  let programRepository: TypeOrmProgramRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
          TypeOrmDailyTaskRepository,
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmProgramRepository,
          TypeOrmWorkoutRepository,
          TypeOrmSessionRepository,
          TypeOrmPerformanceRepository,
        ]),
      ],
    }).compile()

    athleteRepository = module.get<TypeOrmAthleteRepository>(
      getRepositoryToken(TypeOrmAthleteRepository),
    )
    biometricsRepository = module.get<TypeOrmBiometricsRepository>(
      getRepositoryToken(TypeOrmBiometricsRepository),
    )
    dailyTaskRepository = module.get<TypeOrmDailyTaskRepository>(
      getRepositoryToken(TypeOrmDailyTaskRepository),
    )
    programRepository = module.get<TypeOrmProgramRepository>(
      getRepositoryToken(TypeOrmProgramRepository),
    )

    const dailyTasks = await dailyTaskRepository.save(dailyTaskFixtures)
    const programs = await programRepository.save(programFixtures)
    const biometrics = await biometricsRepository.save(biometricsFixture)
    const athlete = {
      ...athleteFixture,
      biometrics,
      dailyTasks,
      programs,
    }
    await athleteRepository.save(athlete)
  })

  afterAll(async () => {
    await programRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await dailyTaskRepository.query(`DELETE FROM daily_task;`)
    await athleteRepository.query(`DELETE FROM athlete;`)
    await programRepository.query(`DELETE FROM program;`)
    await biometricsRepository.query(`DELETE FROM biometrics;`)
  })

  it('should be defined', () => {
    expect(athleteRepository).toBeDefined()
  })

  it('should find an athlete by id', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      ...expectedBaseEntity,
      biometrics: new Biometrics(biometricsFixture),
      dailyTasks: dailyTaskFixtures.map(
        (fixture) =>
          new DailyTask({
            ...fixture,
            ...expectedBaseEntity,
          }),
      ),
      programs: programFixtures.map(
        (fixture) =>
          new Program({
            ...fixture,
            ...expectedBaseEntity,
          }),
      ),
    })

    const retrievedAthlete = await athleteRepository.findById(athleteFixture.id)

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })

  it('should find an athlete by email', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      ...expectedBaseEntity,
      biometrics: new Biometrics(biometricsFixture),
      dailyTasks: dailyTaskFixtures.map(
        (fixture) =>
          new DailyTask({
            ...fixture,
            ...expectedBaseEntity,
          }),
      ),
      programs: programFixtures.map(
        (fixture) =>
          new Program({
            ...fixture,
            ...expectedBaseEntity,
          }),
      ),
    })

    const retrievedAthlete = await athleteRepository.findByEmail(
      athleteFixture.email,
    )

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })

  it('should throw an error when email already used', async () => {
    const alreadyRegisteredAthlete = new Athlete(athleteDataBuilder())
    const athleteWithSameEmail = new Athlete(
      athleteDataBuilder({ email: alreadyRegisteredAthlete.email }),
    )

    const expectedErrorCode = RepositoryErrors.DUPLICATED_ENTRY

    await athleteRepository.save(alreadyRegisteredAthlete)

    let thrownError, retrievedAthlete
    try {
      retrievedAthlete = await athleteRepository.save(athleteWithSameEmail)
    } catch (e) {
      thrownError = e
    }

    expect(retrievedAthlete).toBeUndefined()
    expect(thrownError.code).toBe(expectedErrorCode)
  })
})
