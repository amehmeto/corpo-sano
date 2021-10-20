import { AthleteRepository } from './athlete-repository.interface'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { config } from '../../../config'
import { TypeOrmAthleteRepository } from './typeorm-athlete.repository'

describe('TypeOrm Athlete Repository', () => {
  let athleteRepository: AthleteRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
      ],
    }).compile()

    athleteRepository = module.get<TypeOrmAthleteRepository>(
      TypeOrmAthleteRepository,
    )
  })
  it('should be defined', () => {
    expect(athleteRepository)
  })
})
