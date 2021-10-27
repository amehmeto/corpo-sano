import { EntityRepository, Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from './exercise-repository.interface'

@EntityRepository(Exercise)
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  async findById(id: string): Promise<Exercise> {
    const workout = await this.findOne(id, { relations: ['workout'] })
    console.log('repository', workout)
    return workout
  }
}
