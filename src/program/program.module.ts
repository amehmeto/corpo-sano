import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Program } from './entities/program.entity'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramResolver, ProgramService],
})
export class ProgramModule {}
