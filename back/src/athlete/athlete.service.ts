import { Inject, Injectable } from '@nestjs/common'
import {
  ATHLETE_REPOSITORY,
  AthleteRepository,
} from './repositories/athlete-repository.interface'
import { Athlete } from './entities/athlete.entity'

@Injectable()
export class AthleteService {
  constructor(
    @Inject(ATHLETE_REPOSITORY)
    private readonly athleteRepository: AthleteRepository,
  ) {}

  async getById(athleteId: string): Promise<Athlete> {
    return this.athleteRepository.findById(athleteId)
  }
}
