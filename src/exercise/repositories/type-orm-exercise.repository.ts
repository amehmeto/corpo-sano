import { EntityRepository, Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from '../types/exercise-repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
@EntityRepository(Exercise)
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  async findById(id: string): Promise<Exercise> {
    return this.findOne(id)
  }
}
