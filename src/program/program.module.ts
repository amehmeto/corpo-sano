import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Program } from './entities/program.entity'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { PROGRAM_REPOSITORY } from './interfaces/program-repository.interface'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [
    {
      provide: PROGRAM_REPOSITORY,
      useClass: TypeOrmProgramRepository,
    },
    ProgramResolver,
    ProgramService,
  ],
})
export class ProgramModule {}
