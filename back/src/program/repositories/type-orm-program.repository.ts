import { ProgramRepository } from './program-repository.interface'
import { DataSource, Repository } from 'typeorm'
import { Program } from '../entities/program.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Program, dataSource.manager)
  }
  async getAllPrograms(): Promise<Program[]> {
    const programs = await this.find()
    return programs.sort((a, b) => this.sortByCreatedAt(a, b))
  }

  private sortByCreatedAt(a: Program, b: Program) {
    return a.createdAt >= b.createdAt ? 1 : -1
  }

  async getProgram(programId: string): Promise<Program> {
    return this.findOne({
      where: { id: programId },
      relations: {
        workouts: true,
      },
    })
  }

  async updateProgram(programId: string, workout: Workout): Promise<Program> {
    const program = await this.getProgram(programId)
    program.workouts.push(workout)
    const savedProgram = this.save(program)

    return Promise.resolve(savedProgram)
  }
}
