import { DailyTask } from './entities/daily-task.entity';
import { DailyTaskRepository } from './repositories/daily-task-repository.interface';
export declare class DailyTaskService {
    private readonly dailyTaskRepository;
    constructor(dailyTaskRepository: DailyTaskRepository);
    getAll(): Promise<DailyTask[]>;
}
