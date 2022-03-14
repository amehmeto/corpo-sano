import { Module } from '@nestjs/common'
import { DailyTaskService } from './daily-task.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmDailyTaskRepository } from './repositories/daily-task.typeorm.repository'
import { DAILY_TASK_REPOSITORY } from './repositories/daily-task-repository.interface'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmDailyTaskRepository])],
  providers: [
    {
      provide: DAILY_TASK_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmDailyTaskRepository),
    },
    DailyTaskService,
  ],
})
export class DailyTaskModule {}
