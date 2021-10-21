import { Test, TestingModule } from '@nestjs/testing'
import { AthleteService } from './athlete.service'
import { Gender } from './types/gender.enum'
import * as Faker from 'faker'
import { Athlete } from './entities/athlete.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { InMemoryAthleteRepository } from './repositories/in-memory-athlete.repository'

describe('AthleteService', () => {
  let athleteService: AthleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmAthleteRepository),
          useClass: InMemoryAthleteRepository,
        },
        AthleteService,
      ],
    }).compile()

    athleteService = module.get<AthleteService>(AthleteService)
  })

  it('should be defined', () => {
    expect(athleteService).toBeDefined()
  })

  it('should pre-register an athlete with height, weight, gender and birthday', async () => {
    const createAthleteWithPhysicalInfosInput = {
      height: 179,
      weight: 102,
      gender: Gender.MALE,
      birthday: Faker.date.past(1990),
    }
    const expectedAthlete = new Athlete({
      id: expect.any(String),
      ...createAthleteWithPhysicalInfosInput,
    })

    const preregisteredAthlete = await athleteService.registerAthlete(
      createAthleteWithPhysicalInfosInput,
    )

    expect(preregisteredAthlete).toStrictEqual(expectedAthlete)
  })
})
