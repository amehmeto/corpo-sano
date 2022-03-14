"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEmailGateway = void 0;
const Faker = require("faker");
class InMemoryEmailGateway {
    sendConfirmationEmail(athlete) {
        const devWarning = ' //!\\\\ Fake Confirmation Email For Dev Mode //!\\\\';
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
        };
        console.log(devWarning, fakeEmail);
        return Promise.resolve(undefined);
    }
}
exports.InMemoryEmailGateway = InMemoryEmailGateway;
//# sourceMappingURL=in-memory-email.gateway.js.map