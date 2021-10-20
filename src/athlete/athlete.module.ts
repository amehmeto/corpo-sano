import { Module } from '@nestjs/common';
import { AthleteResolver } from './athlete.resolver';
import { AthleteService } from './athlete.service';

@Module({
  providers: [AthleteResolver, AthleteService]
})
export class AthleteModule {}
