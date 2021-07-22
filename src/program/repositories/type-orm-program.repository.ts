import { ProgramRepository } from '../types/program-repository.interface'
import { Repository } from 'typeorm'
import { Program } from '../entities/program.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository {}
