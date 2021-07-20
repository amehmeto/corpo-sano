import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query((returns) => Program)
  async placeholder() {
    return false //👌
  }

  @Mutation((returns) => Program, {
    name: 'createProgram',
  })
  async create(@Args({ name: 'title', type: () => String }) title: string) {
    return this.programService.create(title)
  }
}
