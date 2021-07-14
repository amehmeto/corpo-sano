import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Program } from './entities/program.entity'
import { CreateProgramInput } from './types/create-program-input.type'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>){}

  async create(programInput: CreateProgramInput) {
    const program = new Program(programInput)
    return this.programRepository.save(program)
  }
}
