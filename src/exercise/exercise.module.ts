import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmExerciseRepository])],
  providers: [ExerciseResolver, ExerciseService],
})
export class ExerciseModule {}
