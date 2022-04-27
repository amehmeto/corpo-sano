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
import { FillWorkoutWithExercisesUseCase } from './use-cases/fill-workout-with-exercises.use-case'
import { PROGRAM_REPOSITORY } from '../program/repositories/program-repository.interface'
import { TypeOrmProgramRepository } from '../program/repositories/type-orm-program.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmExerciseTemplateRepository,
      TypeOrmExerciseRepository,
      TypeOrmWorkoutRepository,
      TypeOrmSessionRepository,
      TypeOrmProgramRepository,
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
    {
      provide: PROGRAM_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmProgramRepository),
    },
    WorkoutResolver,
    WorkoutService,
    FillWorkoutWithExercisesUseCase,
  ],
})
export class WorkoutModule {}
