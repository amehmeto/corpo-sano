import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Program } from '../program/entities/program.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Program])],
  providers: [
    /*
    {
      provide: PROGRAM_REPOSITORY,
      useClass: TypeOrmProgramRepository,
    },*/
    WorkoutResolver,
    WorkoutService,
  ],
})
export class WorkoutModule {}
