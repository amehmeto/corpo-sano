import { Test, TestingModule } from '@nestjs/testing'
import { AthleteResolver } from './athlete.resolver'
import { Gender } from './types/gender.enum'
import * as Faker from 'faker'
import { Athlete } from './entities/athlete.entity'
import { AthleteService } from './athlete.service'

describe('AthleteResolver', () => {
  let athleteResolver: AthleteResolver
  let athleteService: AthleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthleteResolver, AthleteService],
    }).compile()

    athleteResolver = module.get<AthleteResolver>(AthleteResolver)
    athleteService = module.get<AthleteService>(AthleteService)
  })

  it('should be defined', () => {
    expect(athleteResolver).toBeDefined()
  })

  it('should pre-register an athlete with height, weight, gender and birthday', async () => {
    const savePhysicalInfosInput = {
      height: 179,
      weight: 102,
      gender: Gender.MALE,
      birthday: Faker.date.past(1990),
    }
    const expectedAthlete = new Athlete(savePhysicalInfosInput)

    athleteService.createAthleteWithPhysicalInfos = jest
      .fn()
      .mockResolvedValue(expectedAthlete)

    const preregisteredAthlete = await athleteResolver.savePhysicalInfos(
      savePhysicalInfosInput,
    )

    expect(preregisteredAthlete).toStrictEqual(expectedAthlete)
  })
})
