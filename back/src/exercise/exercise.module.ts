import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseTemplateResolver } from './exercise-template.resolver'
import { ExerciseTemplateService } from './exercise-template.service'
import { TypeOrmExerciseTemplateRepository } from './repositories/type-orm-exercise-template.repository'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'
import { EXERCISE_REPOSITORY } from './repositories/exercise-repository.interface'
import { EXERCISE_TEMPLATE_REPOSITORY } from './repositories/exercise-template.repository.interface'
import { Exercise } from './entities/exercise.entity'
import { ExerciseTemplate } from './entities/exercise-template.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exercise,
      ExerciseTemplate,
      TypeOrmExerciseTemplateRepository,
      TypeOrmExerciseRepository,
    ]),
  ],
  providers: [
    {
      provide: EXERCISE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseRepository),
    },
    {
      provide: EXERCISE_TEMPLATE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmExerciseTemplateRepository),
    },
    ExerciseTemplateResolver,
    ExerciseTemplateService,
    ExerciseResolver,
    ExerciseService,
  ],
  exports: [EXERCISE_REPOSITORY, EXERCISE_TEMPLATE_REPOSITORY],
})
export class ExerciseModule {}
