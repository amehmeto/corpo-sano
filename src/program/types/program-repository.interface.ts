import { CreateProgramInput } from './create-program-input.type'
import { Program } from '../entities/program.entity'

export interface ProgramRepository {
  save(program: CreateProgramInput): Promise<Program>
  getAllPrograms(): Promise<Program[]>
}
