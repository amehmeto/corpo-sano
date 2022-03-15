import { Athlete } from '../../home/entities/athlete.entity'

export class AthleteMapper {
  public static mapToDomain(rawAthlete: any): Athlete {
    return new Athlete(
      rawAthlete.id,
      rawAthlete.name,
      rawAthlete.surname,
      rawAthlete.email,
      rawAthlete.phone,
      rawAthlete.address,
      rawAthlete.birthDate,
    )
  }
}
