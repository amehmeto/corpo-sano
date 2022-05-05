import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmProgramRepository } from './type-orm-program.repository'
import { Program } from '../entities/program.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import {
  programFixture,
  programFixtures,
} from '../data-builders/program.data-builder'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'
import { Workout } from '../../workout/entities/workout.entity'
import {
  workoutDataBuilder,
  workoutFixture,
} from '../../workout/data-builders/workout.data-builder'
import { exerciseFixtures } from '../../exercise/data-builders/exercise.data-builder'
import { sessionFixture } from '../../session/data-builders/session.data-builder'
import { performanceFixture } from '../../performance/data-builders/performance.data-builder'
import { Session } from '../../session/entities/session.entity'

async function createProgramFixture(
  programRepository: TypeOrmProgramRepository,
) {
  await programRepository.save(programFixtures)
}

describe('TypeOrm Program Repository', () => {
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

    programRepository = module.get<TypeOrmProgramRepository>(
      TypeOrmProgramRepository,
    )

    await programRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await programRepository.query('DELETE FROM program')
    await createProgramFixture(programRepository)
  })

  afterAll(async () => {
    await programRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await programRepository.query('DELETE FROM program')
  })

  it('should be defined', () => {
    expect(programRepository).toBeDefined()
  })

  it('should get a program', async () => {
    const programId = programFixtures[2].id
    const expectedProgram = new Program(programFixtures[2])

    const retrievedProgram = await programRepository.getProgram(programId)

    expect(retrievedProgram).toStrictEqual(expectedProgram)
  })

  it('should get all programs', async () => {
    const expectedPrograms = [
      new Program(programFixtures[0]),
      new Program(programFixtures[1]),
      new Program(programFixtures[2]),
    ]

    const retrievedPrograms = await programRepository.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })

  it('should save workouts to program', async () => {
    const [program] = await programRepository.find()
    const workout = new Workout(workoutFixture)
    program.workouts.push(workout)

    const expectedProgram = program

    const retrievedProgram = await programRepository.updateProgram(
      program.id,
      workout,
    )

    expect(retrievedProgram).toStrictEqual(expectedProgram)
  })
})
