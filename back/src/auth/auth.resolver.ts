import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import { Athlete } from '../athlete/models/athlete.model'
import { RegisterAthleteInput } from './types/register-athlete.input'
import { AccessToken } from './types/access-token.type-2'
import { Public } from './is-public.decorator'
import { GraphQLBoolean } from 'graphql'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Query(() => AccessToken)
  async signIn(@Args('payload') authCredentialsInput: AuthCredentialsInput) {
    return this.authService.signIn(authCredentialsInput)
  }

  @Public()
  @Mutation(() => Athlete)
  async registerAthlete(
    @Args('payload') registerAthleteInput: RegisterAthleteInput,
  ): Promise<Athlete> {
    return this.authService.register(registerAthleteInput)
  }

  @Public()
  @Mutation(() => GraphQLBoolean)
  async sendConfirmationEmail(
    @Args({ name: 'athleteId', type: () => ID }) athleteId: string,
  ): Promise<boolean> {
    return this.authService.sendConfirmationEmail(athleteId)
  }
}
