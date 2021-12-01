import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { authCredentialsInputDataBuilder } from './data-builders/auth-credentials-input.data-builder'
import { InMemoryAthleteRepository } from '../athlete/repositories/in-memory-athlete.repository'
import {
  ATHLETE_REPOSITORY,
  AthleteRepository,
} from '../athlete/repositories/athlete-repository.interface'
import { ConflictException, UnauthorizedException } from '@nestjs/common'
import * as Faker from 'faker'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { registerAthleteInputDataBuilder } from './data-builders/register-athlete-input.data-builder'
import { Athlete } from '../athlete/entities/athlete.entity'
import * as Bcrypt from 'bcrypt'
import { EmailGateway, EmailGatewayToken } from './gateways/email.gateway'
import { InMemoryEmailGateway } from './gateways/in-memory-email.gateway'

describe('AuthService', () => {
  let authService: AuthService
  let athleteRepository: AthleteRepository
  let jwtService: JwtService
  let emailGateway: EmailGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'should be an env var',
          signOptions: { expiresIn: 3600 },
        }),
      ],
      providers: [
        {
          provide: ATHLETE_REPOSITORY,
          useClass: InMemoryAthleteRepository,
        },
        {
          provide: EmailGatewayToken,
          useClass: InMemoryEmailGateway,
        },
        AuthService,
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    athleteRepository = module.get<AthleteRepository>(ATHLETE_REPOSITORY)
    jwtService = module.get<JwtService>(JwtService)
    emailGateway = module.get<EmailGateway>(EmailGatewayToken)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('signIn', () => {
    it('should return the JWT access token', async () => {
      const [athlete] = await athleteRepository.find()
      const authCredentialsInput = authCredentialsInputDataBuilder({
        email: athlete.email,
        password: 'qwerty',
      })
      const expectedAccessToken = {
        token: jwtService.sign({ athleteId: athlete.id }),
      }

      const retrievedAccessToken = await authService.signIn(
        authCredentialsInput,
      )

      expect(retrievedAccessToken).toStrictEqual(expectedAccessToken)
    })

    it("should throw an UnauthorizedException if the athlete doesn't exists", async () => {
      const randomAuthCredentialsInput = authCredentialsInputDataBuilder()
      const expectedException = new UnauthorizedException()

      let thrownException, retrieveAthlete
      try {
        retrieveAthlete = await authService.signIn(randomAuthCredentialsInput)
      } catch (e) {
        thrownException = e
      }

      expect(retrieveAthlete).toBeUndefined()
      expect(thrownException).toStrictEqual(expectedException)
    })

    it("should throw an UnauthorizedException if the athlete's password is wrong", async () => {
      const [athlete] = await athleteRepository.find()
      const authCredentialsInput = authCredentialsInputDataBuilder({
        email: athlete.email,
        password: Faker.random.alphaNumeric(16),
      })
      const expectedException = new UnauthorizedException()

      let thrownException, retrieveAthlete
      try {
        retrieveAthlete = await authService.signIn(authCredentialsInput)
      } catch (e) {
        thrownException = e
      }

      expect(retrieveAthlete).toBeUndefined()
      expect(thrownException).toStrictEqual(expectedException)
    })
  })

  describe('register', () => {
    it('should register the athlete with hashed and salted password', async () => {
      const registerAthleteInput = registerAthleteInputDataBuilder()
      const expectedAthlete = new Athlete({
        ...registerAthleteInput,
        id: expect.any(String),
        password: expect.any(String),
      })

      const registeredAthlete = await authService.register(registerAthleteInput)
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
        retrievedAthlete = await authService.register(athleteWithSameEmail)
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
        retrievedAthlete = await authService.register(
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

    await authService.sendConfirmationEmail(athlete.id)

    expect(sendConfirmationEmail).toHaveBeenCalledWith(athlete)
  })
})
