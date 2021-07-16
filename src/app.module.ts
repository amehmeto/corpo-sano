import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProgramModule } from './program/program.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutModule } from './workout/workout.module'

@Module({
  imports: [
    ProgramModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'corposano',
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    WorkoutModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
