import { DailyTaskRepository } from './daily-task-repository.interface';
import { DailyTask } from '../entities/daily-task.entity';
export declare class DailyTaskInMemoryRepository implements DailyTaskRepository {
    private dailyTasks;
    find(): Promise<DailyTask[]>;
}
