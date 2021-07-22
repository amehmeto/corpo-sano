import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from '../types/exercise-repository.interface'

@Injectable()
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  findById(id: string): Promise<Exercise> {
    return Promise.resolve(undefined)
  }
}
