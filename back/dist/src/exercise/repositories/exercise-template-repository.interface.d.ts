import { ExerciseTemplate } from '../entities/exercise-template.entity';
export declare const EXERCISE_TEMPLATE_REPOSITORY = "EXERCISE_TEMPLATE_REPOSITORY";
export interface ExerciseTemplateRepository {
    find(): Promise<ExerciseTemplate[]>;
    findById(id: string): Promise<ExerciseTemplate>;
}
