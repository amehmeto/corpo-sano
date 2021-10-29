import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { Athlete } from './entities/athlete.entity'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { InjectRepository } from '@nestjs/typeorm'
import { AthleteRepository } from './repositories/athlete-repository.interface'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { v4 as uuid } from 'uuid'
import { EmailGateway, EmailGatewayToken } from './gateways/email.gateway'
import { RepositoryErrors } from './types/repository-errors.enum'
import * as Bcrypt from 'bcrypt'

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
    @Inject(EmailGatewayToken)
    private readonly emailGateway: EmailGateway,
  ) {}

  async register(registerAthleteInput: RegisterAthleteInput): Promise<Athlete> {
    try {
      const { password } = registerAthleteInput
      const salt = await Bcrypt.genSalt()
      const hashedPassword = await Bcrypt.hash(password, salt)
      const athlete = new Athlete({
        id: uuid(),
        ...registerAthleteInput,
        password: hashedPassword,
      })
      return this.athleteRepository.save(athlete)
    } catch (e) {
      AthleteService.handleRegisterErrors(e)
    }
  }

  private static handleRegisterErrors(e: any): never {
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
