import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Program } from '../program/entities/program.entity'
import { EXERCISE_REPOSITORY } from '../exercise/types/exercise-repository.interface'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { WORKOUT_REPOSITORY } from './types/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout, Program, TypeOrmExerciseRepository]),
  ],
  providers: [
    WorkoutResolver,
    WorkoutService,
    {
      provide: EXERCISE_REPOSITORY,
      useClass: TypeOrmExerciseRepository,
    },
    {
      provide: WORKOUT_REPOSITORY,
      useClass: TypeOrmWorkoutRepository,
    },
  ],
})
export class WorkoutModule {}
