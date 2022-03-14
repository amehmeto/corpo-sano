import { Repository } from 'typeorm';
import { DailyTask } from '../entities/daily-task.entity';
import { DailyTaskRepository } from './daily-task-repository.interface';
export declare class TypeOrmDailyTaskRepository extends Repository<DailyTask> implements DailyTaskRepository {
    getAll(): Promise<DailyTask[]>;
}
