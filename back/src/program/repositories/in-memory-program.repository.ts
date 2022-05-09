import { ProgramRepository } from './program-repository.interface'
import { CreateProgramInput } from '../types/create-program-input.type'
import { Program } from '../entities/program.entity'
import { v4 as uuid } from 'uuid'
import { programDataBuilder } from '../data-builders/program.data-builder'
import { UpdateResult } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'

export class InMemoryProgramRepository implements ProgramRepository {
  private programsData = [
    programDataBuilder(),
    programDataBuilder(),
    programDataBuilder(),
    programDataBuilder(),
  ]

  private programs = this.programsData.map((data) => new Program(data))

  save(program: CreateProgramInput): Promise<Program> {
    return Promise.resolve(new Program({ ...program, id: uuid() }))
  }

  async updateProgram(programId: string, workout: Workout): Promise<Program> {
    const program = new Program({ workouts: [workout] })
    return Promise.resolve(program)
  }

  getAllPrograms(): Promise<Program[]> {
    return Promise.resolve([new Program(), new Program()])
  }

  getProgram(programId: string): Promise<Program> {
    return Promise.resolve(
      this.programs.find((program) => program.id == programId),
    )
  }

  find(): Promise<Program[]> {
    return Promise.resolve(this.programs)
  }

  softDelete(programId: string): Promise<UpdateResult> {
    const softDeletedProgram = new UpdateResult()
    return Promise.resolve(softDeletedProgram)
  }
}
