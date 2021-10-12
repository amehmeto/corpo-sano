import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmExerciseTemplateRepository,
      TypeOrmExerciseRepository,
      TypeOrmWorkoutRepository,
    ]),
  ],
  providers: [WorkoutResolver, WorkoutService],
})
export class WorkoutModule {}
