import {
  Args,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthCredentialsInput } from './types/auth-credentials.input'
import { Athlete } from '../athlete/models/athlete.model'
import { RegisterAthleteInput } from './types/register-athlete.input'

@ObjectType()
export class AccessToken {
  @Field()
  token: string
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AccessToken)
  async signIn(@Args('payload') authCredentialsInput: AuthCredentialsInput) {
    return this.authService.signIn(authCredentialsInput)
  }

  @Mutation(() => Athlete)
  async registerAthlete(
    @Args('payload') registerAthleteInput: RegisterAthleteInput,
  ): Promise<Athlete> {
    return this.authService.register(registerAthleteInput)
  }

  @Mutation(() => Athlete) //TODO: C'est bien de la merde de retourner un Athlete mais je trouve pas comment ne rien envoyer
  async sendConfirmationEmail(
    @Args({ name: 'athleteId', type: () => ID }) athleteId: string,
  ): Promise<Athlete> {
    return this.authService.sendConfirmationEmail(athleteId)
  }
}
