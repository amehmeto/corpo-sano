import { EntityRepository, Repository } from 'typeorm'
import { DailyTask } from '../entities/daily-task.entity'
import { DailyTaskRepository } from './daily-task-repository.interface'

@EntityRepository(DailyTask)
export class TypeOrmDailyTaskRepository
  extends Repository<DailyTask>
  implements DailyTaskRepository
{
  async getAll(): Promise<DailyTask[]> {
    return this.find({
      order: {
        createdAt: 'ASC',
      },
    })
  }
}
