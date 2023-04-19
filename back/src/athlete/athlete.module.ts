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
import { WORKOUT_REPOSITORY } from '../workout/repositories/workout.repository.interface'
import { TypeOrmSessionRepository } from '../session/repositories/session.typeorm.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import {
  BIOMETRICS_REPOSITORY,
  TypeOrmBiometricsRepository,
} from '../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../workout/repositories/workout.typeorm.repository'
import { DAILY_TASK_REPOSITORY } from '../daily-task/repositories/daily-task-repository.interface'
import { PROGRAM_REPOSITORY } from '../program/repositories/program-repository.interface'
import { TypeOrmDailyTaskRepository } from '../daily-task/repositories/daily-task.typeorm.repository'
import { EXERCISE_TEMPLATE_REPOSITORY } from '../exercise/repositories/exercise-template.repository.interface'
import { SESSION_REPOSITORY } from '../session/repositories/session.repository.interface'
import { TypeOrmProgramRepository } from '../program/repositories/type-orm-program.repository'
import { EXERCISE_REPOSITORY } from '../exercise/repositories/exercise-repository.interface'
import { TypeOrmPerformanceRepository } from '../performance/repositories/performance.typeorm.repository'
import { PERFORMANCE_REPOSITORY } from '../performance/repositories/performance.repository.interface'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmAthleteRepository,
      TypeOrmBiometricsRepository,
      TypeOrmDailyTaskRepository,
      TypeOrmExerciseRepository,
      TypeOrmExerciseTemplateRepository,
      TypeOrmProgramRepository,
      TypeOrmWorkoutRepository,
      TypeOrmSessionRepository,
      TypeOrmPerformanceRepository,
    ]),
  ],
  providers: [
    {
      provide: ATHLETE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmAthleteRepository),
    },
    {
      provide: BIOMETRICS_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmBiometricsRepository),
    },
    {
      provide: DAILY_TASK_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmDailyTaskRepository),
    },
    {
      provide: EXERCISE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseRepository),
    },
    {
      provide: EXERCISE_TEMPLATE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseTemplateRepository),
    },
    {
      provide: PROGRAM_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmProgramRepository),
    },
    {
      provide: WORKOUT_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmWorkoutRepository),
    },
    {
      provide: SESSION_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmSessionRepository),
    },
    {
      provide: PERFORMANCE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmPerformanceRepository),
    },
    AthleteResolver,
    AthleteService,
  ],
})
export class AthleteModule {}
