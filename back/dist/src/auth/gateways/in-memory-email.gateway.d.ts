import { EmailGateway } from './email.gateway';
import { Athlete } from '../../athlete/entities/athlete.entity';
export declare class InMemoryEmailGateway implements EmailGateway {
    sendConfirmationEmail(athlete: Athlete): Promise<void>;
}
