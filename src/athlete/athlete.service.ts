import { Injectable } from '@nestjs/common'
import { Athlete } from './entities/athlete.entity'
import { SavePhysicalInfosInput } from './types/save-physical-infos.input'

@Injectable()
export class AthleteService {
  savePhysicalInfos(
    savePhysicalInfosInput: SavePhysicalInfosInput,
  ): Promise<Athlete> {
    return Promise.resolve(undefined)
  }
}
