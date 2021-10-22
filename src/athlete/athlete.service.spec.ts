import { Test, TestingModule } from '@nestjs/testing'
import { AthleteService } from './athlete.service'
import { Gender } from './types/gender.enum'
import * as Faker from 'faker'
import { Athlete } from './entities/athlete.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { InMemoryAthleteRepository } from './repositories/in-memory-athlete.repository'
import { MetricUnit } from './types/metric-system.enum'
import { WeightUnit } from './types/weight-unit.enum'
import { WeightGoal } from './types/weight-goal.enum'
import { EmailGateway, EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'

describe('AthleteService', () => {
  let athleteService: AthleteService
  let emailGateway: EmailGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmAthleteRepository),
          useClass: InMemoryAthleteRepository,
        },
        {
          provide: EmailGatewayToken,
          useClass: InMemoryEmailGateway,
        },
        AthleteService,
      ],
    }).compile()

    athleteService = module.get<AthleteService>(AthleteService)
    emailGateway = module.get<EmailGateway>(EmailGatewayToken)
  })

  it('should be defined', () => {
    expect(athleteService).toBeDefined()
  })

  it('should register the athlete', async () => {
    const registerAthlete = {
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
    const expectedAthlete = new Athlete({
      id: expect.any(String),
      ...registerAthlete,
    })

    const registeredAthlete = await athleteService.register(registerAthlete)

    expect(registeredAthlete).toStrictEqual(expectedAthlete)
  })

  it('should send a confirmation email', async () => {
    const athleteId = Faker.datatype.uuid()
    const athlete = new Athlete({
      id: athleteId,
      email: expect.any(String),
      name: expect.any(String),
    })

    const sendConfirmationEmail = jest.spyOn(
      emailGateway,
      'sendConfirmationEmail',
    )

    await athleteService.sendConfirmationEmail(athleteId)

    expect(sendConfirmationEmail).toHaveBeenCalledWith(athlete)
  })
})
