import { Injectable } from '@nestjs/common'
import { ExerciseTemplate } from './entities/exercise-template.entity'
import { ExerciseTemplateRepository } from './repositories/exercise-template-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmExerciseTemplateRepository } from './repositories/type-orm-exercise-template.repository'

@Injectable()
export class ExerciseTemplateService {
  constructor(
    @InjectRepository(TypeOrmExerciseTemplateRepository)
    private readonly exerciseRepository: ExerciseTemplateRepository,
  ) {}

  getAllExerciseTemplates(): Promise<ExerciseTemplate[]> {
    return this.exerciseRepository.find()
  }
}
