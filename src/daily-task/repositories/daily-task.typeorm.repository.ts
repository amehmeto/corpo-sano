import { EntityRepository, Repository } from 'typeorm'
import { DailyTask } from '../entities/daily-task.entity'
import { DailyTaskRepository } from './daily-task-repository.interface'

@EntityRepository(DailyTask)
export class TypeOrmDailyTaskRepository
  extends Repository<DailyTask>
  implements DailyTaskRepository
{
  async getAll(): Promise<DailyTask[]> {
    const dailyTasks = await this.find()
    return dailyTasks.sort((a, b) => this.sortByCreatedAt(a, b))
  }

  private sortByCreatedAt(a: DailyTask, b: DailyTask) {
    return a.createdAt >= b.createdAt ? 1 : -1
  }
}
