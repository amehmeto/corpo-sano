import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'
import { PROGRAM_REPOSITORY } from './repositories/program-repository.interface'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmProgramRepository,
      TypeOrmAthleteRepository,
    ]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    {
      provide: PROGRAM_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmProgramRepository),
    },
    ProgramResolver,
    ProgramService,
  ],
})
export class ProgramModule {}
