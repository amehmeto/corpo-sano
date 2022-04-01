import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { UpdateResult } from 'typeorm'

export const PROGRAM_REPOSITORY = 'PROGRAM_REPOSITORY'

export interface ProgramRepository {
  save(program: CreateProgramInput): Promise<Program>

  getProgram(programId: string): Promise<Program>

  getAllPrograms(): Promise<Program[]>

  find(): Promise<Workout[]>

  softDelete(programId: string): Promise<UpdateResult>
}
