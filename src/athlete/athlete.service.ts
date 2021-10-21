import { Injectable } from '@nestjs/common'
import { Athlete } from './entities/athlete.entity'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { InjectRepository } from '@nestjs/typeorm'
import { AthleteRepository } from './repositories/athlete-repository.interface'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { v4 as uuid } from 'uuid'

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(TypeOrmAthleteRepository)
    private readonly athleteRepository: AthleteRepository,
  ) {}

  registerAthlete(
    registerAthleteInput: RegisterAthleteInput,
  ): Promise<Athlete> {
    return this.athleteRepository.save({
      id: uuid(),
      ...registerAthleteInput,
    })
  }
}
