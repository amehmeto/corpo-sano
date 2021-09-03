import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmExerciseRepository])],
  providers: [ExerciseResolver, ExerciseService],
})
export class ExerciseModule {}
