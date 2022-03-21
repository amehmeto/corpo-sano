import { Biometrics } from '../entities/biometrics.entity'
import { Athlete } from '../entities/athlete.entity'

export class AthleteMapper {
  static mapToDomain(rawAthlete: any) {
    const rawBiometrics = rawAthlete.biometrics
    const mappedBiometrics = new Biometrics(
      rawBiometrics.bodyFat,
      rawBiometrics.height,
      rawBiometrics.weight,
      rawBiometrics.lengthUnit,
      rawBiometrics.weightUnit,
      rawBiometrics.gender,
      rawBiometrics.birthday,
      rawBiometrics.weightGoal,
    )
    return new Athlete(
      rawAthlete.id,
      rawAthlete.name,
      rawAthlete.email,
      rawAthlete.password,
      rawAthlete.avatar,
      mappedBiometrics,
      rawAthlete.dailyTasks,
      rawAthlete.programs,
    )
  }
}
