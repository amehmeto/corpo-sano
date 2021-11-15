import { Inject, Injectable } from '@nestjs/common'
import {
  ATHLETE_REPOSITORY,
  AthleteRepository,
} from './repositories/athlete-repository.interface'

@Injectable()
export class AthleteService {
  constructor(
    @Inject(ATHLETE_REPOSITORY)
    private readonly athleteRepository: AthleteRepository,
  ) {}
}
