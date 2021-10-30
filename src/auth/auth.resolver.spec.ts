import { Test, TestingModule } from '@nestjs/testing'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { authCredentialsInputDataBuilder } from '../../test/data-builders/auth-credentials-input.data-builder'

describe('AuthResolver', () => {
  let authResolver: AuthResolver
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    }).compile()

    authResolver = module.get<AuthResolver>(AuthResolver)
    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authResolver).toBeDefined()
  })

  it('should sign in the athlete', async () => {
    const authCredentialsInput = authCredentialsInputDataBuilder()

    authService.signIn = jest.fn()

    await authResolver.signIn(authCredentialsInput)

    expect(authService.signIn).toHaveBeenCalledWith(authCredentialsInput)
  })
})
