import { Athlete } from '../entities/athlete.entity'

export const ATHLETE_REPOSITORY = 'ATHLETE_REPOSITORY'

export interface AthleteRepository {
  find(): Promise<Athlete[]>
  save(athlete: Partial<Athlete>): Promise<Athlete>
  findById(athleteId: string): Promise<Athlete>
  findByEmail(athleteEmail: string): Promise<Athlete>
}
