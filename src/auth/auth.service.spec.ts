import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { authCredentialsInputDataBuilder } from '../../test/data-builders/auth-credentials-input.data-builder'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { InMemoryAthleteRepository } from '../athlete/repositories/in-memory-athlete.repository'
import { AthleteRepository } from '../athlete/repositories/athlete-repository.interface'
import { UnauthorizedException } from '@nestjs/common'
import * as Faker from 'faker'
import { JwtModule, JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let authService: AuthService
  let athleteRepository: AthleteRepository
  let jwtService: JwtService

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
          provide: getRepositoryToken(TypeOrmAthleteRepository),
          useClass: InMemoryAthleteRepository,
        },
        AuthService,
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    athleteRepository = module.get<AthleteRepository>(
      getRepositoryToken(TypeOrmAthleteRepository),
    )
    jwtService = module.get<JwtService>(JwtService)
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
})
