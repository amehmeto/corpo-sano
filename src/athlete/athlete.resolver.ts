import { Resolver } from '@nestjs/graphql'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { AthleteService } from './athlete.service'
import { Athlete } from './models/athlete.model'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}
  async registerAthlete(
    registerAthleteInput: RegisterAthleteInput,
  ): Promise<Athlete> {
    return this.athleteService.registerAthlete(registerAthleteInput)
  }
}
