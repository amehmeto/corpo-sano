import { Test, TestingModule } from '@nestjs/testing'
import { AthleteResolver } from './athlete.resolver'
import * as Faker from 'faker'
import { Athlete } from './entities/athlete.entity'
import { AthleteService } from './athlete.service'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'
import { registerAthleteInputDataBuilder } from '../../test/data-builders/register-athlete-input.data-builder'

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
    const registerAthleteInput = registerAthleteInputDataBuilder()
    const expectedAthlete = new Athlete({
      id: Faker.datatype.uuid(),
      ...registerAthleteInput,
    })

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
