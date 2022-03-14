import { Test } from '@nestjs/testing'
import { DailyTaskService } from './daily-task.service'
import {
  DAILY_TASK_REPOSITORY,
  DailyTaskRepository,
} from './repositories/daily-task-repository.interface'
import { DailyTaskInMemoryRepository } from './repositories/daily-task.in-memory.repository'

describe('DailyTaskService', () => {
  let dailyTaskService: DailyTaskService
  let dailyTaskRepository: DailyTaskRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: DAILY_TASK_REPOSITORY,
          useClass: DailyTaskInMemoryRepository,
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
