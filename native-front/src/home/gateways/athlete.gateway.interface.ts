import { Athlete } from '../entities/athlete.entity'

export interface AthleteGateway {
  findById(athleteId: string): Promise<Athlete>
  findAll(): Promise<any[]>
}
