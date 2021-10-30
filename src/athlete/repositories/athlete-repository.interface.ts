import { Athlete } from '../entities/athlete.entity'

export interface AthleteRepository {
  find(): Promise<Athlete[]>
  save(athlete: Partial<Athlete>): Promise<Athlete>
  findById(athleteId: string): Promise<Athlete>
  findByEmail(athleteEmail: string): Promise<Athlete>
}
