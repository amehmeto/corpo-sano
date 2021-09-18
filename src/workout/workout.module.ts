import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { EXERCISE_REPOSITORY } from '../exercise/types/exercise-repository.interface'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { WORKOUT_REPOSITORY } from './types/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmExerciseRepository,
      TypeOrmWorkoutRepository,
    ]),
  ],
  providers: [WorkoutResolver, WorkoutService],
})
export class WorkoutModule {}
