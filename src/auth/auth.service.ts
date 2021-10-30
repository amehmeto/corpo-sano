import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import { AthleteRepository } from '../athlete/repositories/athlete-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { Athlete } from '../athlete/entities/athlete.entity'
import * as Bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
  ) {}

  async signIn(authCredentialsInput: AuthCredentialsInput): Promise<Athlete> {
    const { email, password } = authCredentialsInput
    const retrievedAthlete = await this.athleteRepository.findByEmail(email)

    console.log(password, retrievedAthlete)
    if (
      !retrievedAthlete ||
      (await this.isWrongPassword(password, retrievedAthlete.password))
    )
      throw new UnauthorizedException()
    return retrievedAthlete
  }

  private async isWrongPassword(
    password: string,
    retrievedAthletePassword: string,
  ) {
    return !(await Bcrypt.compare(password, retrievedAthletePassword))
  }
}
