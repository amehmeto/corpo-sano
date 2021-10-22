import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
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

  @Mutation(() => Athlete) //TODO: C'est bien de la merde de retourner un Athlete mais je trouve pas comment ne rien envoyer
  async sendConfirmationEmail(
    @Args({ name: 'athleteId', type: () => ID }) athleteId: string,
  ): Promise<Athlete> {
    return this.athleteService.sendConfirmationEmail(athleteId)
  }
}
