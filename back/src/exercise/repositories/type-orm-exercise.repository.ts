import { DataSource, Repository } from 'typeorm'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseRepository } from './exercise-repository.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmExerciseRepository
  extends Repository<Exercise>
  implements ExerciseRepository
{
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {
    super(
      exerciseRepository.target,
      exerciseRepository.manager,
      exerciseRepository.queryRunner,
    )
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
