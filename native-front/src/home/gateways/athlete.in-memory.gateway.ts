import { AthleteGateway } from './athlete.gateway.interface'
import { athleteDataBuilder } from '../../_data-builders/athlete-data.builder'
import { Athlete } from '../entities/athlete.entity'

export class InMemoryAthleteGateway implements AthleteGateway {
  private rawAthletes = [
    athleteDataBuilder(),
    athleteDataBuilder(),
    athleteDataBuilder(),
  ]

  private athletes = this.rawAthletes.map((rawAthlete) => {
    return new Athlete(
      rawAthlete.id,
      rawAthlete.name,
      rawAthlete.email,
      rawAthlete.password,
      rawAthlete.avatar,
      rawAthlete.biometrics,
      rawAthlete.dailyTasks,
    )
  })

  findAll(): Promise<any[]> {
    return Promise.resolve(this.athletes)
  }

  findById(athleteId: string): Promise<Athlete> {
    return Promise.resolve(this.athletes[0])
  }

  delete(athleteId: string): Promise<void> {
    const foundIndex = this.athletes.findIndex(
      (athlete) => athlete.id === athleteId,
    )
    this.athletes.splice(foundIndex, 1)
    return Promise.resolve()
  }
}
