export const EmailGatewayToken = 'EmailGateway'

export interface EmailGateway {
  sendConfirmationEmail(athleteEmail: string): Promise<void>
}
