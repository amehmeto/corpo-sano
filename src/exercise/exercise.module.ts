import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'
import { Exercise } from './entities/exercise.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExerciseResolver, ExerciseService],
})
export class ExerciseModule {}
