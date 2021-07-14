import { Args, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'

@Resolver((of) => Program)
export class ProgramResolver {
  @Query((returns) => Program)
  async getAuthor(@Args('id', { type: () => String }) id: string) {
    return {
      id: 'coucou',
    }
  }
}
