import { Module } from '@nestjs/common';
import { ProgramResolver } from './program.resolver';
import { ProgramService } from './program.service';

@Module({
  providers: [ProgramResolver, ProgramService],
})
export class ProgramModule {}
