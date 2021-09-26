import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query(() => Program)
  async placeholder() {
    return false //👌
  }

  @Mutation(() => Program, {
    name: 'createProgram',
  })
  async create(@Args({ name: 'title', type: () => String }) title: string) {
    return this.programService.create(title)
  }

  async getAllPrograms(): Promise<Program[]> {
    return this.programService.getAllPrograms()
  }
}
