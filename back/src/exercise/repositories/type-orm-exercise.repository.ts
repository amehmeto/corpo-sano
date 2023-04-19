import { DataSource, Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from './exercise-repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Exercise, dataSource.manager)
  }
  async findById(id: string): Promise<Exercise> {
    return this.findOne({
      where: { id },
      relations: {
        workout: {
          exercises: {
            template: true,
          },
        },
      },
    })
  }
}
