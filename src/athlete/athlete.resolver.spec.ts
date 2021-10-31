import { Test, TestingModule } from '@nestjs/testing'
import { AthleteResolver } from './athlete.resolver'
import { AthleteService } from './athlete.service'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'

describe('AthleteResolver', () => {
  let athleteResolver: AthleteResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthleteResolver, AthleteService, TypeOrmAthleteRepository],
    }).compile()

    athleteResolver = module.get<AthleteResolver>(AthleteResolver)
  })

  it('should be defined', () => {
    expect(athleteResolver).toBeDefined()
  })
})
