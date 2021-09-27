import { ProgramRepository } from '../types/program-repository.interface'
import { EntityRepository, Repository } from 'typeorm'
import { Program } from '../entities/program.entity'

@EntityRepository(Program)
export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository
{
  getAllPrograms(): Promise<Program[]> {
    return this.find({
      order: {
        title: 'ASC',
      },
    })
  }
}
