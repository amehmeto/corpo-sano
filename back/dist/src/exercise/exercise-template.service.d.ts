import { ExerciseTemplate } from './entities/exercise-template.entity';
import { ExerciseTemplateRepository } from './repositories/exercise-template-repository.interface';
export declare class ExerciseTemplateService {
    private readonly exerciseRepository;
    constructor(exerciseRepository: ExerciseTemplateRepository);
    getAllExerciseTemplates(): Promise<ExerciseTemplate[]>;
}
