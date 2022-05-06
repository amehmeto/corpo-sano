import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { UpdateResult } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'

export const PROGRAM_REPOSITORY = 'PROGRAM_REPOSITORY'

export interface ProgramRepository {
  save(program: CreateProgramInput): Promise<Program>

  updateProgram(programId: string, workout: Workout): Promise<Program>

  getProgram(programId: string): Promise<Program>

  getAllPrograms(): Promise<Program[]>

  find(): Promise<Program[]>

  softDelete(programId: string): Promise<UpdateResult>
}
