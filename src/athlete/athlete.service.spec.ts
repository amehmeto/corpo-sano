import { Test, TestingModule } from '@nestjs/testing'
import { AthleteService } from './athlete.service'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import {
  ATHLETE_REPOSITORY,
  AthleteRepository,
} from './repositories/athlete-repository.interface'
import { InMemoryAthleteRepository } from './repositories/in-memory-athlete.repository'

describe('AthleteService', () => {
  let athleteService: AthleteService
  let athleteRepository: AthleteRepository

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
    athleteRepository = module.get<AthleteRepository>(ATHLETE_REPOSITORY)
  })

  it('should be defined', () => {
    expect(athleteService).toBeDefined()
  })

  it('should get the athlete by id', async () => {
    const [athlete] = await athleteRepository.find()

    const retrievedAthlete = await athleteService.getById(athlete.id)

    expect(retrievedAthlete).toStrictEqual(athlete)
  })
})
