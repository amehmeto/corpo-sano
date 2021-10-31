import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import { AthleteRepository } from '../athlete/repositories/athlete-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AccessToken } from './types/access-token.type'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
    private readonly jwtService: JwtService,
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
}
