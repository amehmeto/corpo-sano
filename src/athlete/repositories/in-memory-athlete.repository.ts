import { AthleteRepository } from './athlete-repository.interface'
import { RegisterAthleteInput } from '../types/register-athlete.input'
import { Athlete } from '../entities/athlete.entity'
import { v4 as uuid } from 'uuid'

export class InMemoryAthleteRepository implements AthleteRepository {
  save(savePhysicalInfosInput: RegisterAthleteInput): Promise<Athlete> {
    return Promise.resolve(
      new Athlete({
        id: uuid(),
        ...savePhysicalInfosInput,
      }),
    )
  }
}
