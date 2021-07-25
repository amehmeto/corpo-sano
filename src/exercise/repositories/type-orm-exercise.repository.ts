import { EntityRepository, Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from '../types/exercise-repository.interface'

@EntityRepository(Exercise)
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  constructor() {
    super()
  }

  async findById(id: string): Promise<Exercise> {
    console.warn('wesh', this)
    return this.findOne(id)
  }
}
