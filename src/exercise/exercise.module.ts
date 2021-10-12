import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseTemplateResolver } from './exercise-template.resolver'
import { ExerciseTemplateService } from './exercise-template.service'
import { TypeOrmExerciseTemplateRepository } from './repositories/type-orm-exercise-template.repository'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmExerciseTemplateRepository,
      TypeOrmExerciseRepository,
    ]),
  ],
  providers: [
    ExerciseTemplateResolver,
    ExerciseTemplateService,
    ExerciseResolver,
    ExerciseService,
  ],
})
export class ExerciseModule {}
