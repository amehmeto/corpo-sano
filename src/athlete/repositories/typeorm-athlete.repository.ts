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
      relations: ['biometrics', 'dailyTasks', 'programs'],
    })
  }

  findByEmail(athleteEmail: string): Promise<Athlete> {
    return this.findOne(
      { email: athleteEmail },
      {
        relations: ['biometrics', 'dailyTasks', 'programs'],
      },
    )
  }

  private sortByCreatedAt(a: any, b: any) {
    return a.createdAt >= b.createdAt ? 1 : -1
  }
}
