import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmProgramRepository } from './type-orm-program.repository'
import { Program } from '../entities/program.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { programDataBuilder } from '../data-builders/program.data-builder'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'

const programFixtures = [programDataBuilder(), programDataBuilder()]

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

  it('should get program', async () => {
    const expectedProgram = expect.any(Program)

    const programId = programFixtures[0].id
    const retrievedProgram = await programRepository.getProgram(programId)

    expect(retrievedProgram).toStrictEqual(expectedProgram)
  })

  it('should get all programs', async () => {
    const expectedPrograms = [
      new Program(programFixtures[0]),
      new Program(programFixtures[1]),
    ]

    const retrievedPrograms = await programRepository.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
