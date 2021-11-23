import { DailyTask } from '../entities/daily-task.entity'

export const DAILY_TASK_REPOSITORY = 'DAILY_TASK_REPOSITORY'

export interface DailyTaskRepository {
  find(): Promise<DailyTask[]>
}
