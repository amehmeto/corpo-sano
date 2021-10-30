import { Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './types/auth-credentials.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  async signIn(authCredentialsInput: AuthCredentialsInput) {
    return this.authService.signIn(authCredentialsInput)
  }
}
