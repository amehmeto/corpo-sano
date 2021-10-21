import { Athlete } from '../entities/athlete.entity'

export interface AthleteRepository {
  save(athlete: Partial<Athlete>): Promise<Athlete>
  findById(athleteId: string): Promise<Athlete>
}
