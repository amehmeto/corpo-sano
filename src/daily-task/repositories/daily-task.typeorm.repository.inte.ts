import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../../config'
import { Test } from '@nestjs/testing'
import { TypeOrmDailyTaskRepository } from './daily-task.typeorm.repository'
import { dailyTaskDataBuilder } from '../data-builders/daily-task.data-builder'
import { DailyTask } from '../entities/daily-task.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmExerciseTemplateRepository } from '../../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/typeorm-workout.repository'

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
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
          TypeOrmDailyTaskRepository,
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmProgramRepository,
          TypeOrmWorkoutRepository,
        ]),
      ],
    }).compile()

    dailyTaskRepository = module.get<TypeOrmDailyTaskRepository>(
      TypeOrmDailyTaskRepository,
    )

    await generateDailyTasksFixtures(dailyTaskRepository)
  })

  afterAll(async () => {
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
