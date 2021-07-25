import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmExerciseRepository])],
})
export class ExerciseModule {}
