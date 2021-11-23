import { DailyTaskRepository } from './daily-task-repository.interface'
import { DailyTask } from '../entities/daily-task.entity'
import { dailyTaskDataBuilder } from '../data-builders/daily-task.data-builder'

export class DailyTaskInMemoryRepository implements DailyTaskRepository {
  private dailyTasks = [
    new DailyTask(dailyTaskDataBuilder()),
    new DailyTask(dailyTaskDataBuilder()),
    new DailyTask(dailyTaskDataBuilder()),
    new DailyTask(dailyTaskDataBuilder()),
  ]

  find(): Promise<DailyTask[]> {
    return Promise.resolve(this.dailyTasks)
  }
}
