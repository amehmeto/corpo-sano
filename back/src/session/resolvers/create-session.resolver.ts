import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateSessionUseCase } from '../use-cases/create-session.use-case'
import { CreateSessionInput } from '../types/create-session.input'
import { Session } from '../models/session.model'

@Resolver()
export class CreateSessionResolver {
  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  @Mutation(() => Session)
  async createSession(
    @Args('payload') payload: CreateSessionInput,
  ): Promise<Session> {
    return this.createSessionUseCase.execute(payload)
  }
}
