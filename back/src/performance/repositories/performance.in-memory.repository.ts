import { PerformanceRepository } from './performance.repository.interface'
import { Performance } from '../entities/performance.entity'

export class InMemoryPerformanceRepository implements PerformanceRepository {
  save(performance: Performance): Promise<Performance> {
    return Promise.resolve(new Performance(performance))
  }
}
