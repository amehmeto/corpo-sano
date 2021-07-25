import { Injectable } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from '../types/workout-repository.interface'

@Injectable()
@EntityRepository(Workout)
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  findById(param: string): Promise<Workout> {
    return Promise.resolve(new Workout())
  }
}
