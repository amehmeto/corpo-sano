import { ProgramRepository } from './program-repository.interface'
import { EntityRepository, Repository } from 'typeorm'
import { Program } from '../entities/program.entity'

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
}
