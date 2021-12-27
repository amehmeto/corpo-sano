import { PerformanceRepository } from './performance.repository.interface'
import { Performance } from '../entities/performance.entity'
import * as Faker from 'faker'

export class InMemoryPerformanceRepository implements PerformanceRepository {
  save(performance: Partial<Performance>): Promise<Performance> {
    const perf = new Performance({
      id: Faker.datatype.uuid(),
      ...performance,
    })
    return Promise.resolve(perf)
  }
}
