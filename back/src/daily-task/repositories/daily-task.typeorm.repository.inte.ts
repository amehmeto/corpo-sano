import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from '../../../databaseConfig'
import { Test } from '@nestjs/testing'
import { TypeOrmDailyTaskRepository } from './daily-task.typeorm.repository'
import { dailyTaskDataBuilder } from '../data-builders/daily-task.data-builder'
import { DailyTask } from '../entities/daily-task.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'
import { Athlete } from '../../athlete/entities/athlete.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { ExerciseTemplate } from '../../exercise/entities/exercise-template.entity'
import { Program } from '../../program/entities/program.entity'
import { Session } from '../../session/entities/session.entity'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { Performance } from '../../performance/entities/performance.entity'

const dailyTasksFixtures = [dailyTaskDataBuilder(), dailyTaskDataBuilder()]

async function generateDailyTasksFixtures(
  dailyTaskRepository: TypeOrmDailyTaskRepository,
) {
  await dailyTaskRepository.save(dailyTasksFixtures)
}

describe('TypeOrm DailyTask Repository', () => {
  let dailyTaskRepository: TypeOrmDailyTaskRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([
          DailyTask,
          Athlete,
          Biometrics,
          DailyTask,
          Exercise,
          ExerciseTemplate,
          Program,
          Workout,
          Session,
          Performance,
        ]),
      ],
      providers: [
        TypeOrmAthleteRepository,
        TypeOrmBiometricsRepository,
        TypeOrmDailyTaskRepository,
        TypeOrmExerciseRepository,
        TypeOrmExerciseTemplateRepository,
        TypeOrmProgramRepository,
        TypeOrmWorkoutRepository,
        TypeOrmSessionRepository,
        TypeOrmPerformanceRepository,
      ],
    }).compile()

    dailyTaskRepository = module.get<TypeOrmDailyTaskRepository>(
      TypeOrmDailyTaskRepository,
    )

    await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await dailyTaskRepository.query(`DELETE FROM daily_task;`)
    await generateDailyTasksFixtures(dailyTaskRepository)
  })

  afterAll(async () => {
    await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0')
    await dailyTaskRepository.query(`DELETE FROM daily_task;`)
  })

  it('should be defined', () => {
    expect(dailyTaskRepository).toBeDefined()
  })

  it('should get all daily tasks', async () => {
    const expectedDailyTasks = [
      new DailyTask(dailyTasksFixtures[0]),
      new DailyTask(dailyTasksFixtures[1]),
    ]

    const retrievedDailyTasks = await dailyTaskRepository.getAll()

    expect(retrievedDailyTasks).toStrictEqual(expectedDailyTasks)
  })
})
