import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { AthleteService } from './athlete.service'
import { Athlete } from './models/athlete.model'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}

  @Mutation(() => Athlete)
  async registerAthlete(
    @Args('payload') registerAthleteInput: RegisterAthleteInput,
  ): Promise<Athlete> {
    return this.athleteService.register(registerAthleteInput)
  }

  async sendConfirmationEmail(athleteId: string): Promise<boolean> {
    return this.athleteService.sendConfirmationEmail(athleteId)
  }
}
