import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ProgramModule } from './program/program.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { WorkoutModule } from './workout/workout.module'
import { ExerciseModule } from './exercise/exercise.module'
import { config } from '../config'
import { AthleteModule } from './athlete/athlete.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
    ExerciseModule,
    ProgramModule,
    WorkoutModule,
    AthleteModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
