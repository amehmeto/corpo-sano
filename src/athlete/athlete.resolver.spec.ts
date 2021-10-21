import { Test, TestingModule } from '@nestjs/testing'
import { AthleteResolver } from './athlete.resolver'
import { Gender } from './types/gender.enum'
import * as Faker from 'faker'
import { Athlete } from './entities/athlete.entity'
import { AthleteService } from './athlete.service'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { WeightUnit } from './types/weight-unit.enum'
import { MetricUnit } from './types/metric-system.enum'
import { WeightGoal } from './types/weight-goal.enum'
import { EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'

describe('AthleteResolver', () => {
  let athleteResolver: AthleteResolver
  let athleteService: AthleteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EmailGatewayToken, useClass: InMemoryEmailGateway },
        AthleteResolver,
        AthleteService,
        TypeOrmAthleteRepository,
      ],
    }).compile()

    athleteResolver = module.get<AthleteResolver>(AthleteResolver)
    athleteService = module.get<AthleteService>(AthleteService)
  })

  it('should be defined', () => {
    expect(athleteResolver).toBeDefined()
  })

  it('should register the athlete', async () => {
    const registerAthleteInput = {
      height: 179,
      metricUnit: MetricUnit.METRE,
      weight: 102,
      weightUnit: WeightUnit.KILOGRAM,
      gender: Gender.MALE,
      birthday: Faker.date.past(1990),
      weightGoal: WeightGoal.SLOW_LOSS,
      email: Faker.internet.email(),
      password: Faker.random.alphaNumeric(),
    }
    const expectedAthlete = new Athlete(registerAthleteInput)

    athleteService.register = jest.fn().mockResolvedValue(expectedAthlete)

    const registeredAthlete = await athleteResolver.registerAthlete(
      registerAthleteInput,
    )

    expect(athleteService.register).toHaveBeenCalledWith(registerAthleteInput)
    expect(registeredAthlete).toStrictEqual(expectedAthlete)
  })

  it('should send a confirmation email', async () => {
    const athleteId = Faker.datatype.uuid()

    athleteService.sendConfirmationEmail = jest.fn()

    await athleteResolver.sendConfirmationEmail(athleteId)

    expect(athleteService.sendConfirmationEmail).toHaveBeenCalledWith(athleteId)
  })
})
