import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'
import { PROGRAM_REPOSITORY } from './repositories/program-repository.interface'
import { TypeOrmAthleteRepository } from '../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmWorkoutRepository } from '../workout/repositories/workout.typeorm.repository'
import { WORKOUT_REPOSITORY } from '../workout/repositories/workout.repository.interface'
import { Program } from './entities/program.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Program,
      TypeOrmProgramRepository,
      TypeOrmAthleteRepository,
      TypeOrmWorkoutRepository,
    ]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    {
      provide: PROGRAM_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmProgramRepository),
    },
    {
      provide: WORKOUT_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmWorkoutRepository),
    },
    ProgramResolver,
    ProgramService,
  ],
  exports: [PROGRAM_REPOSITORY],
})
export class ProgramModule {}
