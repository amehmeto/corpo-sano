import { ProgramRepository } from './program-repository.interface'
import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { v4 as uuid } from 'uuid'

export class InMemoryProgramRepository implements ProgramRepository {
  save(program: CreateProgramInput): Promise<Program> {
    return Promise.resolve(new Program({ ...program, id: uuid() }))
  }

  getAllPrograms(): Promise<Program[]> {
    return Promise.resolve([new Program(), new Program()])
  }
}
