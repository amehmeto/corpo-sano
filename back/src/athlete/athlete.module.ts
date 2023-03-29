import { Module } from '@nestjs/common'
import { AthleteResolver } from './athlete.resolver'
import { AthleteService } from './athlete.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './repositories/typeorm-athlete.repository'
import { ATHLETE_REPOSITORY } from './repositories/athlete-repository.interface'
import { Athlete } from './entities/athlete.entity'
import { Biometrics } from '../biometrics/entities/biometrics.entity'
import { DailyTask } from '../daily-task/entities/daily-task.entity'
import { Exercise } from '../exercise/entities/exercise.entity'
import { ExerciseTemplate } from '../exercise/entities/exercise-template.entity'
import { Program } from '../program/entities/program.entity'
import { Workout } from '../workout/entities/workout.entity'
import { Session } from '../session/entities/session.entity'
import { Performance } from '../performance/entities/performance.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Athlete,
      Biometrics,
      DailyTask,
      Exercise,
      ExerciseTemplate,
      Program,
      Workout,
      Session,
      Performance,
    ]),
  ],
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
