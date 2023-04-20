import { DataSource, Repository } from 'typeorm'
import { Performance } from '../entities/performance.entity'
import { PerformanceRepository } from './performance.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmPerformanceRepository
  extends Repository<Performance>
  implements PerformanceRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Performance, dataSource.manager)
  }
}
