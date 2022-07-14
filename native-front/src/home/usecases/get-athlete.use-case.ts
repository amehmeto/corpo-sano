import { AthleteGateway } from '../gateways/athlete.gateway.interface'

export class GetAthleteUseCase {
  constructor(private readonly athleteGateway: AthleteGateway) {}

  async execute(athleteId: string) {
    return this.athleteGateway.findById(athleteId)
  }
}
