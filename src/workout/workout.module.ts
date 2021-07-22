import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Program } from '../program/entities/program.entity'
import { EXERCISE_REPOSITORY } from '../exercise/types/exercise-repository.interface'

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Program])],
  providers: [
    WorkoutResolver,
    WorkoutService,
    {
      provide: EXERCISE_REPOSITORY,
      useValue: {},
    },
  ],
})
export class WorkoutModule {}
