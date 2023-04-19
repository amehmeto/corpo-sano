import { DataSource, Repository } from 'typeorm'
import { Biometrics } from '../entities/biometrics.entity'
import { BiometricsRepository } from './biometrics-repository.interface'
import { Injectable } from '@nestjs/common'

export const BIOMETRICS_REPOSITORY = 'BIOMETRICS_REPOSITORY'

@Injectable()
export class TypeOrmBiometricsRepository
  extends Repository<Biometrics>
  implements BiometricsRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Biometrics, dataSource.manager)
  }
  async findById(id: string): Promise<Biometrics> {
    return this.findOneBy({ id })
  }
}
