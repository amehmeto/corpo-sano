import { Test } from '@nestjs/testing'
import { DailyTaskService } from './daily-task.service'
import {
  DAILY_TASK_REPOSITORY,
  DailyTaskRepository,
} from './repositories/daily-task-repository.interface'
import { InMemoryDailyTaskRepository } from './repositories/in-memory-daily-task.repository'

describe('DailyTaskService', () => {
  let dailyTaskService: DailyTaskService
  let dailyTaskRepository: DailyTaskRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DAILY_TASK_REPOSITORY,
          useClass: InMemoryDailyTaskRepository,
        },
        DailyTaskService,
      ],
    }).compile()

    dailyTaskService = module.get<DailyTaskService>(DailyTaskService)
    dailyTaskRepository = module.get<DailyTaskRepository>(DAILY_TASK_REPOSITORY)
  })

  it('should be defined', () => {
    expect(dailyTaskService).toBeDefined()
  })

  it('should get all daily tasks', async () => {
    const expectedTasks = await dailyTaskRepository.find()

    const retrievedTasks = await dailyTaskService.getAll()

    expect(retrievedTasks).toStrictEqual(expectedTasks)
  })
})
