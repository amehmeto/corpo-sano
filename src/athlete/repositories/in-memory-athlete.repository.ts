import { AthleteRepository } from './athlete-repository.interface'
import { RegisterAthleteInput } from '../../auth/types/register-athlete.input'
import { Athlete } from '../entities/athlete.entity'
import { v4 as uuid } from 'uuid'
import { athleteDataBuilder } from '../../../test/data-builders/athlete.data-builder'
import { RepositoryErrors } from '../types/repository-errors.enum'

export class InMemoryAthleteRepository implements AthleteRepository {
  private athletesData = [
    athleteDataBuilder(),
    athleteDataBuilder(),
    athleteDataBuilder(),
  ]
  private athletes = this.athletesData.map(
    (athleteData) => new Athlete(athleteData),
  )

  save(registerAthleteInput: RegisterAthleteInput): Promise<Athlete> {
    const { email } = registerAthleteInput
    const registeredAthleteEmails = this.athletesData.map(
      (athlete) => athlete.email,
    )

    if (registeredAthleteEmails.includes(email))
      throw new Error(RepositoryErrors.DUPLICATED_ENTRY)

    return Promise.resolve(
      new Athlete({
        id: uuid(),
        ...registerAthleteInput,
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

  findByEmail(athleteEmail: string): Promise<Athlete> {
    return Promise.resolve(
      this.athletes.find((athlete: any) => athlete.email === athleteEmail),
    )
  }
}
