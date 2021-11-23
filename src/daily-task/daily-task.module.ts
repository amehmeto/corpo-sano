import { Module } from '@nestjs/common'
import { DailyTaskService } from './daily-task.service'

@Module({
  providers: [DailyTaskService],
})
export class DailyTaskModule {}
