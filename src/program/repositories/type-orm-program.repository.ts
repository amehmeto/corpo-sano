import { ProgramRepository } from '../interfaces/program-repository.interface'
import { Repository } from 'typeorm'
import { Program } from '../entities/program.entity'

export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository {}
