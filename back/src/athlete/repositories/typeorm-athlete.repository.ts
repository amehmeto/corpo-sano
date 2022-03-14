import { EntityRepository, Repository } from 'typeorm'
import { Athlete } from '../entities/athlete.entity'
import { AthleteRepository } from './athlete-repository.interface'

@EntityRepository(Athlete)
export class TypeOrmAthleteRepository
  extends Repository<Athlete>
  implements AthleteRepository
{
  async findById(athleteId: string): Promise<Athlete> {
    const athlete = await this.findOne(athleteId, {
      relations: ['biometrics', 'dailyTasks', 'programs'],
    })
    athlete.programs = [...athlete.programs].sort((a, b) =>
      this.sortByCreatedAt(a, b),
    )
    athlete.dailyTasks = [...athlete.dailyTasks].sort((a, b) =>
      this.sortByCreatedAt(a, b),
    )
    return athlete
  }

  async findByEmail(athleteEmail: string): Promise<Athlete> {
    const athlete = await this.findOne(
      { email: athleteEmail },
      {
        relations: ['biometrics', 'dailyTasks', 'programs'],
      },
    )
    if (athlete.programs)
      athlete.programs = [...athlete.programs].sort((a, b) =>
        this.sortByCreatedAt(a, b),
      )
    athlete.dailyTasks = [...athlete.dailyTasks].sort((a, b) =>
      this.sortByCreatedAt(a, b),
    )
    return athlete
  }

  private sortByCreatedAt(a: any, b: any) {
    return a.createdAt >= b.createdAt ? 1 : -1
  }
}
