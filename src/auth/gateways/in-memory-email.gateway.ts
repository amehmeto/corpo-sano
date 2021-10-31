import { EmailGateway } from './email.gateway'
import * as Faker from 'faker'
import { Athlete } from '../../athlete/entities/athlete.entity'

export class InMemoryEmailGateway implements EmailGateway {
  sendConfirmationEmail(athlete: Athlete): Promise<void> {
    const devWarning = ' //!\\\\ Fake Confirmation Email For Dev Mode //!\\\\'
    const fakeEmail = {
      sendgridFormat: [
        {
          to: [
            {
              email: athlete.email,
              name: athlete.name,
            },
          ],
          subject: `Welcome on Corpo Sano! 💪
          
          Get started on your journey, ${athlete.name}
          
          CONFIRM EMAIL BY ENTERING CODE 👉 ${Faker.datatype.number()} 👈`,
        },
      ],
      content: [
        {
          type: 'text/plain',
          value: 'Heya!',
        },
      ],
      from: {
        email: 'no-reply@corpo-sano.com',
        name: 'Corpo Sano',
      },
      reply_to: {
        email: 'no-reply@corpo-sano.com',
        name: 'Corpo Sano',
      },
    }

    console.log(devWarning, fakeEmail)
    return Promise.resolve(undefined)
  }
}
