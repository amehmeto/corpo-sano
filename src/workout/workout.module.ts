import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
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
