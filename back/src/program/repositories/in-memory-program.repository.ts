import { ProgramRepository } from './program-repository.interface'
import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { v4 as uuid } from 'uuid'
import { programFixtures } from '../data-builders/program.data-builder'

export class InMemoryProgramRepository implements ProgramRepository {
  private programsData = programFixtures

  save(program: CreateProgramInput): Promise<Program> {
    return Promise.resolve(new Program({ ...program, id: uuid() }))
  }

  getAllPrograms(): Promise<Program[]> {
    return Promise.resolve([new Program(), new Program()])
  }

  getProgram(programId: string): Promise<Program> {
    return Promise.resolve(
      this.programsData.find((program) => program.id == programId),
    )
  }
}
