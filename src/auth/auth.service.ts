import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import { AthleteRepository } from '../athlete/repositories/athlete-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AccessToken } from './types/access-token.type'
import { RegisterAthleteInput } from '../athlete/types/register-athlete.input'
import { Athlete } from '../athlete/entities/athlete.entity'
import { v4 as uuid } from 'uuid'
import { RepositoryErrors } from '../athlete/types/repository-errors.enum'
import {
  EmailGateway,
  EmailGatewayToken,
} from '../athlete/gateways/email.gateway'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
    private readonly jwtService: JwtService,
    @Inject(EmailGatewayToken)
    private readonly emailGateway: EmailGateway,
  ) {}

  async signIn(
    authCredentialsInput: AuthCredentialsInput,
  ): Promise<AccessToken> {
    const { email, password } = authCredentialsInput
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
      const { password } = registerAthleteInput
      const salt = await Bcrypt.genSalt()
      const hashedPassword = await Bcrypt.hash(password, salt)
      const athlete = new Athlete({
        ...registerAthleteInput,
        id: uuid(),
        password: hashedPassword,
      })
      return this.athleteRepository.save(athlete)
    } catch (e) {
      this.handleRegisterErrors(e)
    }
  }

  private handleRegisterErrors(e: any): never {
    throw e.message === RepositoryErrors.DUPLICATED_ENTRY
      ? new ConflictException('Username already taken')
      : e
  }

  async sendConfirmationEmail(athleteId: string): Promise<Athlete> {
    const athlete = await this.athleteRepository.findById(athleteId)
    await this.emailGateway.sendConfirmationEmail(athlete)
    return athlete
  }
}
