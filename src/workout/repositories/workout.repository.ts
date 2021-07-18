import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from '../interfaces/workout-repository.interface'

@Injectable()
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository {}
