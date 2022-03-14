import { AuthService } from './auth.service';
import { AuthCredentialsInput } from './types/auth-credentials.input';
import { Athlete } from '../athlete/models/athlete.model';
import { RegisterAthleteInput } from './types/register-athlete.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(authCredentialsInput: AuthCredentialsInput): Promise<import("./types/access-token.type").AccessToken>;
    registerAthlete(registerAthleteInput: RegisterAthleteInput): Promise<Athlete>;
    sendConfirmationEmail(athleteId: string): Promise<Athlete>;
}
