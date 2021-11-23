import { DailyTaskRepository } from './daily-task-repository.interface'
import { DailyTask } from '../entities/daily-task.entity'
import * as Faker from 'faker'

export class InMemoryDailyTaskRepository implements DailyTaskRepository {
  private dailyTasks = [
    { description: Faker.lorem.lines() } as DailyTask,
    { description: Faker.lorem.lines() } as DailyTask,
    { description: Faker.lorem.lines() } as DailyTask,
    { description: Faker.lorem.lines() } as DailyTask,
    { description: Faker.lorem.lines() } as DailyTask,
  ]

  find(): Promise<DailyTask[]> {
    return Promise.resolve(this.dailyTasks)
  }
}
