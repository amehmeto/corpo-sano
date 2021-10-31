import { Resolver } from '@nestjs/graphql'
import { AthleteService } from './athlete.service'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}
}
