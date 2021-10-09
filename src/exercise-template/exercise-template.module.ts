import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseTemplateResolver } from './exercise-template.resolver'
import { ExerciseTemplateService } from './exercise-template.service'
import { TypeOrmExerciseTemplateRepository } from './repositories/type-orm-exercise-template.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmExerciseTemplateRepository])],
  providers: [ExerciseTemplateResolver, ExerciseTemplateService],
})
export class ExerciseTemplateModule {}
