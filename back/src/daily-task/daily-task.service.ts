import { Inject, Injectable } from '@nestjs/common'
import { DailyTask } from './entities/daily-task.entity'
import {
  DAILY_TASK_REPOSITORY,
  DailyTaskRepository,
} from './repositories/daily-task-repository.interface'

@Injectable()
export class DailyTaskService {
  constructor(
    @Inject(DAILY_TASK_REPOSITORY)
    private readonly dailyTaskRepository: DailyTaskRepository,
  ) {}

  async getAll(): Promise<DailyTask[]> {
    return this.dailyTaskRepository.find()
  }
}
