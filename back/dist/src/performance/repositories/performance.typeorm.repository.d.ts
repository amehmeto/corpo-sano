import { Repository } from 'typeorm';
import { Performance } from '../entities/performance.entity';
import { PerformanceRepository } from './performance.repository.interface';
export declare class TypeOrmPerformanceRepository extends Repository<Performance> implements PerformanceRepository {
}
