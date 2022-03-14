import { AuthCredentialsInput } from './types/auth-credentials.input';
import { AthleteRepository } from '../athlete/repositories/athlete-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './types/access-token.type';
import { RegisterAthleteInput } from './types/register-athlete.input';
import { Athlete } from '../athlete/entities/athlete.entity';
import { EmailGateway } from './gateways/email.gateway';
export declare class AuthService {
    private readonly jwtService;
    private readonly athleteRepository;
    private readonly emailGateway;
    constructor(jwtService: JwtService, athleteRepository: AthleteRepository, emailGateway: EmailGateway);
    signIn(authCredentialsInput: AuthCredentialsInput): Promise<AccessToken>;
    private isWrongPassword;
    register(registerAthleteInput: RegisterAthleteInput): Promise<Athlete>;
    private hash;
    private handleRegisterErrors;
    sendConfirmationEmail(athleteId: string): Promise<Athlete>;
}
