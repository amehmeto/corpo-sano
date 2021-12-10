import { Module } from '@nestjs/common'
import { ProgramModule } from './program/program.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutModule } from './workout/workout.module'
import { ExerciseModule } from './exercise/exercise.module'
import { config } from '../config'
import { AthleteModule } from './athlete/athlete.module'
import { AuthModule } from './auth/auth.module'
import { BiometricsModule } from './biometrics/biometrics.module'
import { DailyTaskModule } from './daily-task/daily-task.module'
import { SessionModule } from './session/session.module'
import { PerformanceModule } from './performance/performance.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(config.db),
    ExerciseModule,
    ProgramModule,
    WorkoutModule,
    AthleteModule,
    AuthModule,
    BiometricsModule,
    DailyTaskModule,
    PerformanceModule,
    SessionModule,
  ],
})
export class AppModule {}
