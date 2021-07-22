import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from './entities/exercise.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
})
export class ExerciseModule {}
