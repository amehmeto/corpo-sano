import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { AthleteService } from './athlete.service'
import { Athlete } from './models/athlete.model'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}

  @Query(() => Athlete)
  async getAthlete(
    @Args({ name: 'athleteId', type: () => ID }) athleteId: string,
  ): Promise<Athlete> {
    return this.athleteService.getById(athleteId)
  }
}
