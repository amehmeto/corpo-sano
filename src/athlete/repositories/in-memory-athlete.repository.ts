import { AthleteRepository } from './athlete-repository.interface'
import { RegisterAthleteInput } from '../types/register-athlete.input'
import { Athlete } from '../entities/athlete.entity'
import { v4 as uuid } from 'uuid'
import { athleteDataBuilder } from '../../../test/data-builders/athlete.data-builder'

export class InMemoryAthleteRepository implements AthleteRepository {
  private athletesData = [
    athleteDataBuilder(),
    athleteDataBuilder(),
    athleteDataBuilder(),
  ]
  private athletes = this.athletesData.map(
    (athleteData) => new Athlete(athleteData),
  )

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
      this.athletes.find((athlete: any) => athlete.id === athleteId),
    )
  }

  find(): Promise<Athlete[]> {
    return Promise.resolve(this.athletes)
  }
}
