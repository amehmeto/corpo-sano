import { DataSource, Repository } from 'typeorm'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { ExerciseTemplateRepository } from './exercise-template.repository.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmExerciseTemplateRepository
  extends Repository<ExerciseTemplate>
  implements ExerciseTemplateRepository
{
  public entity = ExerciseTemplate

  constructor(
    @InjectRepository(ExerciseTemplate)
    private readonly exerciseTemplateRepository: Repository<ExerciseTemplate>,
  ) {
    super(
      exerciseTemplateRepository.target,
      exerciseTemplateRepository.manager,
      exerciseTemplateRepository.queryRunner,
    )
  }
  async findById(id: string): Promise<ExerciseTemplate> {
    return this.findOneBy({ id })
  }
}
