import { AthleteGateway } from '../gateways/athlete.gateway.interface'
import { initializeTokenCheatCode } from '../../_infrastructure/dependency-injection.container'

export class GetAthleteUseCase {
  constructor(private readonly athleteGateway: AthleteGateway) {}

  async execute(athleteId: string) {
    return this.athleteGateway.findById(athleteId)
  }
}
