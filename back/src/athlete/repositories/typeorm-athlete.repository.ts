import { DataSource, Repository } from 'typeorm'
import { Athlete } from '../entities/athlete.entity'
import { AthleteRepository } from './athlete-repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmAthleteRepository
  extends Repository<Athlete>
  implements AthleteRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Athlete, dataSource.manager)
  }

  async findById(athleteId: string): Promise<Athlete> {
    const athlete = await this.findOne({
      where: { id: athleteId },
      relations: {
        biometrics: true,
        dailyTasks: true,
        programs: true,
      },
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
    const athlete = await this.findOne({
      where: { email: athleteEmail },
      relations: { biometrics: true, dailyTasks: true, programs: true },
    })
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
