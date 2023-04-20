import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import {
  ATHLETE_REPOSITORY,
  AthleteRepository,
} from '../athlete/repositories/athlete-repository.interface'
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AccessToken } from './types/access-token.type'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { Athlete } from '../athlete/entities/athlete.entity'
import { v4 as uuid } from 'uuid'
import { RepositoryErrors } from '../athlete/types/repository-errors.enum'
import { EmailGateway, EmailGatewayToken } from './gateways/email.gateway'
import { Biometrics } from '../biometrics/entities/biometrics.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ATHLETE_REPOSITORY)
    private readonly athleteRepository: AthleteRepository,
    @Inject(EmailGatewayToken)
    private readonly emailGateway: EmailGateway,
  ) {}

  async signIn(
    authCredentialsInput: AuthCredentialsInput,
  ): Promise<AccessToken> {
    const { email, password } = authCredentialsInput
    console.log(this.athleteRepository.boubakar)
    const athlete = await this.athleteRepository.findByEmail(email)

    if (!athlete || (await this.isWrongPassword(password, athlete.password)))
      throw new UnauthorizedException()
    const payload = { athleteId: athlete.id }
    const token = this.jwtService.sign(payload)
    return { token }
  }

  private async isWrongPassword(
    password: string,
    athleteHashedPassword: string,
  ) {
    return !(await Bcrypt.compare(password, athleteHashedPassword))
  }

  async register(registerAthleteInput: RegisterAthleteInput): Promise<Athlete> {
    try {
      const { name, email, password, biometrics } = registerAthleteInput
      const hashedPassword = await this.hash(password)
      const athlete = new Athlete({
        id: uuid(),
        biometrics: new Biometrics(biometrics),
        name,
        email,
        password: hashedPassword,
      })
      return this.athleteRepository.save(athlete)
    } catch (e) {
      this.handleRegisterErrors(e)
    }
  }

  private async hash(password: string) {
    const salt = await Bcrypt.genSalt()
    return Bcrypt.hash(password, salt)
  }

  private handleRegisterErrors(e: any): never {
    throw e.message === RepositoryErrors.DUPLICATED_ENTRY
      ? new ConflictException('Username already taken')
      : e
  }

  async sendConfirmationEmail(athleteId: string): Promise<boolean> {
    const athlete = await this.athleteRepository.findById(athleteId)
    await this.emailGateway.sendConfirmationEmail(athlete)
    return true
  }
}
