import { EntityRepository, Repository } from 'typeorm'
import { Biometrics } from '../entities/biometrics.entity'
import { BiometricsRepository } from './biometrics-repository.interface'

export const BIOMETRICS_REPOSITORY = 'BIOMETRICS_REPOSITORY'

@EntityRepository(Biometrics)
export class TypeOrmBiometricsRepository
  extends Repository<Biometrics>
  implements BiometricsRepository
{
  async findById(id: string): Promise<Biometrics> {
    return this.findOneBy({ id })
  }
}
