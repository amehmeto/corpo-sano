import { Module } from '@nestjs/common'
import { ProgramModule } from './program/program.module'
import { GraphQLModule } from '@nestjs/graphql'
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
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
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

export class AppModule {
}
