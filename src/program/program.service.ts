import { Injectable } from '@nestjs/common'
import { Program } from './entities/program.entity'
import { ProgramRepository } from './repositories/program-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(TypeOrmProgramRepository)
    private readonly programRepository: ProgramRepository,
  ) {}

  async create(title: string): Promise<Program> {
    const program = new Program({
      title,
    })
    return this.programRepository.save(program)
  }

  async getAllPrograms(): Promise<Program[]> {
    return this.programRepository.getAllPrograms()
  }
}
