import { CreateAthleteWithPhysicalInfosInput } from '../types/create-athlete-with-physical-infos.input'
import { Athlete } from '../entities/athlete.entity'

export interface AthleteRepository {
  createAthleteWithPhysicalInfos(
    savePhysicalInfosInput: CreateAthleteWithPhysicalInfosInput,
  ): Promise<Athlete>
}
