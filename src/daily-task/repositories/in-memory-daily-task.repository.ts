import { DailyTaskRepository } from './daily-task-repository.interface'
import { DailyTask } from '../entities/daily-task.entity'
import { dailyTaskDataBuilder } from '../../../test/data-builders/daily-task.data-builder'

export class InMemoryDailyTaskRepository implements DailyTaskRepository {
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
