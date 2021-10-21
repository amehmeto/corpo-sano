import { EmailGateway } from './email.gateway'

export class InMemoryEmailGateway implements EmailGateway {
  sendConfirmationEmail(athleteEmail: string): Promise<void> {
    return Promise.resolve(undefined)
  }
}
