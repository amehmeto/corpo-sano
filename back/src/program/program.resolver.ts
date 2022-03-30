import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Program } from './models/program.model'
import { ProgramService } from './program.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.auth.guard'

@Resolver(() => Program)
export class ProgramResolver {
  constructor(private readonly programService: ProgramService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Program])
  async getAllPrograms(): Promise<Program[]> {
    return this.programService.getAllPrograms()
  }

  @Mutation(() => Program)
  async createProgram(@Args('title') title: string): Promise<Program> {
    return this.programService.create(title)
  }

  @Query(() => Program)
  async getProgram(
    @Args({ name: 'programId', type: () => ID }) programId: string,
  ): Promise<Program> {
    return this.programService.getProgram(programId)
  }
}
