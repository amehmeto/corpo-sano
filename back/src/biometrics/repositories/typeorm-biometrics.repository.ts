import { DataSource, Repository } from 'typeorm'
import { Biometrics } from '../entities/biometrics.entity'
import { BiometricsRepository } from './biometrics-repository.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

export const BIOMETRICS_REPOSITORY = 'BIOMETRICS_REPOSITORY'

@Injectable()
export class TypeOrmBiometricsRepository
  extends Repository<Biometrics>
  implements BiometricsRepository
{
  constructor(
    @InjectRepository(Biometrics) biometricsRepository: Repository<Biometrics>,
  ) {
    super(
      biometricsRepository.target,
      biometricsRepository.manager,
      biometricsRepository.queryRunner,
    )
  }
  async findById(id: string): Promise<Biometrics> {
    return this.findOneBy({ id })
  }
}
