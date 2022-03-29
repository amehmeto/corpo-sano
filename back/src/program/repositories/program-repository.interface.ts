import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'

export const PROGRAM_REPOSITORY = 'PROGRAM_REPOSITORY'

export interface ProgramRepository {
  save(program: CreateProgramInput): Promise<Program>

  getProgram(programId: string): Promise<Program>

  getAllPrograms(): Promise<Program[]>
}
