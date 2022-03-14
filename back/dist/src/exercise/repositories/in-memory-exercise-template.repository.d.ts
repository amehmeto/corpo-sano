import { ExerciseTemplate } from '../entities/exercise-template.entity';
import { ExerciseTemplateRepository } from './exercise-template-repository.interface';
export declare class InMemoryExerciseTemplateRepository implements ExerciseTemplateRepository {
    private exercisesTitles;
    private exercises;
    find(): Promise<ExerciseTemplate[]>;
    findById(id: string): Promise<ExerciseTemplate>;
}
