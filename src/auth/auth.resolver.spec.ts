import { Test, TestingModule } from '@nestjs/testing'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { authCredentialsInputDataBuilder } from '../../test/data-builders/auth-credentials-input.data-builder'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { JwtModule } from '@nestjs/jwt'
import * as Faker from 'faker'

describe('AuthResolver', () => {
  let authResolver: AuthResolver
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'should be an env var',
          signOptions: { expiresIn: 3600 },
        }),
      ],
      providers: [AuthResolver, AuthService, TypeOrmAthleteRepository],
    }).compile()

    authResolver = module.get<AuthResolver>(AuthResolver)
    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authResolver).toBeDefined()
  })

  it('should sign in the athlete by returning a JWT token', async () => {
    const authCredentialsInput = authCredentialsInputDataBuilder()
    const fakeToken = { token: Faker.random.alphaNumeric(32) }

    authService.signIn = jest.fn().mockResolvedValue(fakeToken)

    const retrievedToken = await authResolver.signIn(authCredentialsInput)

    expect(retrievedToken).toStrictEqual(fakeToken)
  })
})
