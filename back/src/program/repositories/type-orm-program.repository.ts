import { ProgramRepository } from './program-repository.interface'
import { EntityRepository, Repository } from 'typeorm'
import { Program } from '../entities/program.entity'
import { Workout } from '../../workout/entities/workout.entity'

@EntityRepository(Program)
export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository
{
  async getAllPrograms(): Promise<Program[]> {
    const programs = await this.find()
    return programs.sort((a, b) => this.sortByCreatedAt(a, b))
  }

  private sortByCreatedAt(a: Program, b: Program) {
    return a.createdAt >= b.createdAt ? 1 : -1
  }

  async getProgram(programId: string): Promise<Program> {
    return this.findOne(
      { id: programId },
      {
        relations: ['workouts'],
      },
    )
  }

  async saveWorkoutToProgram(
    programId: string,
    workout: Workout,
  ): Promise<Program> {
    const program = await this.getProgram(programId)
    program.workouts.push(workout)
    return Promise.resolve(this.save(program))
  }
}
