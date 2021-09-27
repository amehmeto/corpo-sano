import { ProgramRepository } from '../types/program-repository.interface'
import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'

export class InMemoryProgramRepository implements ProgramRepository {
  save(program: CreateProgramInput): Promise<Program> {
    return Promise.resolve(new Program(program))
  }

  getAllPrograms(): Promise<Program[]> {
    return Promise.resolve([new Program(), new Program()])
  }
}
