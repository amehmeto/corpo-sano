import { Args, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { Query } from '@nestjs/common'

@Resolver((of) => Program)
export class ProgramResolver {
  @Query((returns) => Program, () => Int, 2)
  async getAuthor(@Args('id', { type: () => String }) id: string) {
    return {
      id: 'coucou',
    }
  }
}
