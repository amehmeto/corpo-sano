import { EntityRepository, Repository } from 'typeorm'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { ExerciseTemplateRepository } from './exercise-template-repository.interface'

@EntityRepository(ExerciseTemplate)
export class TypeOrmExerciseTemplateRepository
  extends Repository<ExerciseTemplate>
  implements ExerciseTemplateRepository
{
  async findById(id: string): Promise<ExerciseTemplate> {
    return this.findOneBy({ id })
  }
}
