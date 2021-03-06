import { Performance } from '../entities/performance.entity'

export const PERFORMANCE_REPOSITORY = 'PERFORMANCE_REPOSITORY'

export interface PerformanceRepository {
  save(performance: Performance): Promise<Performance>
}
