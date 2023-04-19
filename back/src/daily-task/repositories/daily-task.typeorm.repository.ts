import { DataSource, Repository } from 'typeorm'
import { DailyTask } from '../entities/daily-task.entity'
import { DailyTaskRepository } from './daily-task-repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmDailyTaskRepository
  extends Repository<DailyTask>
  implements DailyTaskRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(DailyTask, dataSource.createEntityManager())
  }
  async getAll(): Promise<DailyTask[]> {
    return this.find({
      order: {
        createdAt: 'ASC',
      },
    })
  }
}
