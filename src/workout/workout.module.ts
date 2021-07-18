import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Program } from '../program/entities/program.entity'
import { WORKOUT_REPOSITORY } from './interfaces/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Program])],
  providers: [
    {
      provide: WORKOUT_REPOSITORY,
      useClass: TypeOrmWorkoutRepository,
    },
    WorkoutResolver,
    WorkoutService,
  ],
})
export class WorkoutModule {}
