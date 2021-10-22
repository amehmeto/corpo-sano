import { AthleteRepository } from './athlete-repository.interface'
import { RegisterAthleteInput } from '../types/register-athlete.input'
import { Athlete } from '../entities/athlete.entity'
import { v4 as uuid } from 'uuid'
import * as Faker from 'faker'

export class InMemoryAthleteRepository implements AthleteRepository {
  save(savePhysicalInfosInput: RegisterAthleteInput): Promise<Athlete> {
    return Promise.resolve(
      new Athlete({
        id: uuid(),
        ...savePhysicalInfosInput,
      }),
    )
  }

  findById(athleteId: string): Promise<Athlete> {
    return Promise.resolve(
      new Athlete({
        id: athleteId,
        name: Faker.name.firstName(),
        email: Faker.internet.email(),
      }),
    )
  }
}
