import { Module } from '@nestjs/common'
import { AthleteResolver } from './athlete.resolver'
import { AthleteService } from './athlete.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { ATHLETE_REPOSITORY } from './repositories/athlete-repository.interface'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAthleteRepository])],
  providers: [
    {
      provide: ATHLETE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmAthleteRepository),
    },
    AthleteResolver,
    AthleteService,
  ],
})
export class AthleteModule {}
