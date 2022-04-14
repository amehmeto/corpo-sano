import { Inject, Injectable } from '@nestjs/common'
import { Program } from './entities/program.entity'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from './repositories/program-repository.interface'
import { UpdateResult } from 'typeorm'

@Injectable()
export class ProgramService {
  constructor(
    @Inject(PROGRAM_REPOSITORY)
    private readonly programRepository: ProgramRepository,
  ) {}

  async create(title: string): Promise<Program> {
    const program = new Program({
      title,
    })
    return this.programRepository.save(program)
  }

  async getProgram(programId: string): Promise<Program> {
    return this.programRepository.getProgram(programId)
  }

  async getAllPrograms(): Promise<Program[]> {
    return this.programRepository.getAllPrograms()
  }

  async softDelete(programId: string): Promise<UpdateResult> {
    return this.programRepository.softDelete(programId)
  }
}
