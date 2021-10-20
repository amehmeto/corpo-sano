import { AthleteRepository } from './athlete-repository.interface'
import { CreateAthleteWithPhysicalInfosInput } from '../types/create-athlete-with-physical-infos.input'
import { Athlete } from '../entities/athlete.entity'
import { v4 as uuid } from 'uuid'

export class InMemoryAthleteRepository implements AthleteRepository {
  save(
    savePhysicalInfosInput: CreateAthleteWithPhysicalInfosInput,
  ): Promise<Athlete> {
    return Promise.resolve(
      new Athlete({
        id: uuid(),
        ...savePhysicalInfosInput,
      }),
    )
  }
}
