import { PerformanceRepository } from './performance.repository.interface';
import { Performance } from '../entities/performance.entity';
export declare class InMemoryPerformanceRepository implements PerformanceRepository {
    save(performance: Performance): Promise<Performance>;
}
