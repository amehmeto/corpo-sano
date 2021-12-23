import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from './repositories/workout.typeorm.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { WORKOUT_REPOSITORY } from './repositories/workout.repository.interface'
import { EXERCISE_TEMPLATE_REPOSITORY } from '../exercise/repositories/exercise-template-repository.interface'
import { EXERCISE_REPOSITORY } from '../exercise/repositories/exercise-repository.interface'
import { TypeOrmSessionRepository } from '../session/repositories/session.typeorm.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmExerciseTemplateRepository,
      TypeOrmExerciseRepository,
      TypeOrmWorkoutRepository,
      TypeOrmSessionRepository,
    ]),
  ],
  providers: [
    {
      provide: WORKOUT_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmWorkoutRepository),
    },
    {
      provide: EXERCISE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseRepository),
    },
    {
      provide: EXERCISE_TEMPLATE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseTemplateRepository),
    },
    WorkoutResolver,
    WorkoutService,
  ],
})
export class WorkoutModule {}
