import { Module } from '@nestjs/common'
import { ProgramModule } from './program/program.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutModule } from './workout/workout.module'
import { ExerciseModule } from './exercise/exercise.module'
import { databaseConfig } from '../databaseConfig'
import { AthleteModule } from './athlete/athlete.module'
import { AuthModule } from './auth/auth.module'
import { BiometricsModule } from './biometrics/biometrics.module'
import { DailyTaskModule } from './daily-task/daily-task.module'
import { SessionModule } from './session/session.module'
import { PerformanceModule } from './performance/performance.module'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { TypeOrmAthleteRepository } from './athlete/repositories/typeorm-athlete.repository'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
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
  constructor(private dataSource: DataSource) {}
}
