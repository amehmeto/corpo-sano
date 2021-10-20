import { Module } from '@nestjs/common'
import { AthleteResolver } from './athlete.resolver'
import { AthleteService } from './athlete.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmAthleteRepository])],
  providers: [AthleteResolver, AthleteService],
})
export class AthleteModule {}
