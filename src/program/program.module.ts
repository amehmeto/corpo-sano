import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmProgramRepository])],
  providers: [ProgramResolver, ProgramService],
})
export class ProgramModule {}
