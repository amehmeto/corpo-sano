import { Repository } from 'typeorm';
import { ExerciseTemplate } from '../entities/exercise-template.entity';
import { ExerciseTemplateRepository } from './exercise-template-repository.interface';
export declare class TypeOrmExerciseTemplateRepository extends Repository<ExerciseTemplate> implements ExerciseTemplateRepository {
    findById(id: string): Promise<ExerciseTemplate>;
}
