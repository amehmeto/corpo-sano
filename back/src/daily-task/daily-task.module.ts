import { Module } from '@nestjs/common'
import { DailyTaskService } from './daily-task.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmDailyTaskRepository } from './repositories/daily-task.typeorm.repository'
import { DAILY_TASK_REPOSITORY } from './repositories/daily-task-repository.interface'
import { DailyTask } from './entities/daily-task.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DailyTask, TypeOrmDailyTaskRepository])],
  providers: [
    {
      provide: DAILY_TASK_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmDailyTaskRepository),
    },
    DailyTaskService,
    {
      provide: DAILY_TASK_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmDailyTaskRepository),
    },
  ],
  exports: [
    {
      provide: DAILY_TASK_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmDailyTaskRepository),
    },
  ],
})
export class DailyTaskModule {}
