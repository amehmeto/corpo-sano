import { EntityRepository, Repository } from 'typeorm'
import { Performance } from '../entities/performance.entity'
import { PerformanceRepository } from './performance.repository.interface'

@EntityRepository(Performance)
export class TypeOrmPerformanceRepository
  extends Repository<Performance>
  implements PerformanceRepository {}
