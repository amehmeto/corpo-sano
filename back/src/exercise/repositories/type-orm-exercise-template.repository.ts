import { DataSource, Repository } from 'typeorm'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { ExerciseTemplateRepository } from './exercise-template.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmExerciseTemplateRepository
  extends Repository<ExerciseTemplate>
  implements ExerciseTemplateRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ExerciseTemplate, dataSource.manager)
  }
  async findById(id: string): Promise<ExerciseTemplate> {
    return this.findOneBy({ id })
  }
}
