import { CreateProgramInput } from './create-program-input.type'
import { Program } from '../entities/program.entity'

export const PROGRAM_REPOSITORY = 'ProgramRepository'

export interface ProgramRepository {
  save(program: CreateProgramInput): Promise<Program>
}
