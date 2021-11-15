import { Test, TestingModule } from '@nestjs/testing'
import { AthleteService } from './athlete.service'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { ATHLETE_REPOSITORY } from './repositories/athlete-repository.interface'
import { InMemoryAthleteRepository } from './repositories/in-memory-athlete.repository'

describe('AthleteService', () => {
  let athleteService: AthleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ATHLETE_REPOSITORY,
          useClass: InMemoryAthleteRepository,
        },
        AthleteService,
        TypeOrmAthleteRepository,
      ],
    }).compile()

    athleteService = module.get<AthleteService>(AthleteService)
  })

  it('should be defined', () => {
    expect(athleteService).toBeDefined()
  })
})
