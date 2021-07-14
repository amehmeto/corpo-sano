import { Args, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'
import { CreateProgramInput } from './types/create-program-input.type'

@Resolver((of) => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @Query((returns) => Program)
  async create(@Args('program') program: CreateProgramInput) {
    return this.programService.create(program)
  }
}
