import { Module } from '@nestjs/common'
import { AthleteResolver } from './athlete.resolver'
import { AthleteService } from './athlete.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from '../auth/gql.auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAthleteRepository])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    AthleteResolver,
    AthleteService,
  ],
})
export class AthleteModule {}
