import { Inject, Injectable } from '@nestjs/common'
import { Program } from './entities/program.entity'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from './interfaces/program-repository.interface'

@Injectable()
export class ProgramService {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly programRepository: ProgramRepository,
  ) {}

  async create(title: string) {
    const program = new Program({
      title,
    })
    return this.programRepository.save(program)
  }
}
