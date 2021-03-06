import { Athlete } from '../../athlete/entities/athlete.entity'

export const EmailGatewayToken = 'EmailGateway'

export interface EmailGateway {
  sendConfirmationEmail(athleteEmail: Athlete): Promise<void>
}
