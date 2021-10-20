import { Resolver } from '@nestjs/graphql'
import { CreateAthleteWithPhysicalInfosInput } from './types/create-athlete-with-physical-infos.input'
import { AthleteService } from './athlete.service'
import { Athlete } from './models/athlete.model'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}
  async savePhysicalInfos(
    savePhysicalInfosInput: CreateAthleteWithPhysicalInfosInput,
  ): Promise<Athlete> {
    return this.athleteService.createAthleteWithPhysicalInfos(
      savePhysicalInfosInput,
    )
  }
}
