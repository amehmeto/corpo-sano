import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  providers: [WorkoutResolver, WorkoutService],
})
export class WorkoutModule {}
