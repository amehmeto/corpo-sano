import { Resolver } from '@nestjs/graphql'
import { SavePhysicalInfosInput } from './types/save-physical-infos.input'
import { AthleteService } from './athlete.service'
import { Athlete } from './models/athlete.model'

@Resolver()
export class AthleteResolver {
  constructor(private readonly athleteService: AthleteService) {}
  async savePhysicalInfos(
    savePhysicalInfosInput: SavePhysicalInfosInput,
  ): Promise<Athlete> {
    return this.athleteService.savePhysicalInfos(savePhysicalInfosInput)
  }
}
