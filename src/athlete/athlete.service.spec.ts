import { Test, TestingModule } from '@nestjs/testing'
import { AthleteService } from './athlete.service'
import { Athlete } from './entities/athlete.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { InMemoryAthleteRepository } from './repositories/in-memory-athlete.repository'
import { EmailGateway, EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'
import { registerAthleteInputDataBuilder } from '../../test/data-builders/register-athlete-input.data-builder'
import { AthleteRepository } from './repositories/athlete-repository.interface'
import { ConflictException } from '@nestjs/common'
import * as Bcrypt from 'bcrypt'

describe('AthleteService', () => {
  let athleteService: AthleteService
  let athleteRepository: AthleteRepository
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
    athleteRepository = module.get<AthleteRepository>(
      getRepositoryToken(TypeOrmAthleteRepository),
    )
  })

  it('should be defined', () => {
    expect(athleteService).toBeDefined()
  })

  describe('register', () => {
    it('should register the athlete with hashed and salted password', async () => {
      const registerAthleteInput = registerAthleteInputDataBuilder()
      const expectedAthlete = new Athlete({
        ...registerAthleteInput,
        id: expect.any(String),
        password: expect.any(String),
      })

      const registeredAthlete = await athleteService.register(
        registerAthleteInput,
      )
      const comparedPasswords = Bcrypt.compare(
        registeredAthlete.password,
        registerAthleteInput.password,
      )

      expect(registeredAthlete).toStrictEqual(expectedAthlete)
      expect(registeredAthlete.password).not.toBe(registerAthleteInput.password)
      expect(comparedPasswords).toBeTruthy()
    })

    it('should throw a Conflict Exception when email is already taken', async () => {
      const expectedError = new ConflictException('Username already taken')
      const [alreadyRegisteredAthlete] = await athleteRepository.find()
      const athleteWithSameEmail = registerAthleteInputDataBuilder({
        email: alreadyRegisteredAthlete.email,
      })

      let thrownError, retrievedAthlete
      try {
        retrievedAthlete = await athleteService.register(athleteWithSameEmail)
      } catch (e) {
        thrownError = e
      }

      expect(retrievedAthlete).toBeUndefined()
      expect(thrownError).toStrictEqual(expectedError)
    })

    it('should throw Exception as is if not Conflict Exception', async () => {
      const expectedError = new Error('random')

      athleteRepository.save = jest.fn().mockImplementation(() => {
        throw expectedError
      })

      let thrownError, retrievedAthlete
      try {
        retrievedAthlete = await athleteService.register(
          registerAthleteInputDataBuilder(),
        )
      } catch (e) {
        thrownError = e
      }

      expect(retrievedAthlete).toBeUndefined()
      expect(thrownError).toStrictEqual(expectedError)
    })
  })

  it('should send a confirmation email', async () => {
    const [athlete] = await athleteRepository.find()

    const sendConfirmationEmail = jest.spyOn(
      emailGateway,
      'sendConfirmationEmail',
    )

    await athleteService.sendConfirmationEmail(athlete.id)

    expect(sendConfirmationEmail).toHaveBeenCalledWith(athlete)
  })
})
