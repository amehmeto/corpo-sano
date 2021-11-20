import { EntityRepository, Repository } from 'typeorm'
import { Athlete } from '../entities/athlete.entity'
import { AthleteRepository } from './athlete-repository.interface'

@EntityRepository(Athlete)
export class TypeOrmAthleteRepository
  extends Repository<Athlete>
  implements AthleteRepository
{
  findById(athleteId: string): Promise<Athlete> {
    return this.findOne(athleteId, {
      relations: ['biometrics'],
    })
  }

  findByEmail(athleteEmail: string): Promise<Athlete> {
    return this.findOne(
      { email: athleteEmail },
      {
        relations: ['biometrics'],
      },
    )
  }
}
