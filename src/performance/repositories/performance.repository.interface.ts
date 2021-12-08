import { Performance } from '../entities/performance.entity'

export interface PerformanceRepository {
  save(performance: Performance): Promise<Performance>
}
