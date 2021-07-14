import { Args, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'
import { CreateProgramInput } from './types/create-program-input.type'

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query((returns) => Program)
  async create(@Args('program', { type: () => String }) program: CreateProgramInput) {
    return this.programService.create(program)
  }
}
