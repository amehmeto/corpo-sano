import { ExerciseTemplateService } from './exercise-template.service';
import { ExerciseTemplate } from './models/exercise-template.model';
export declare class ExerciseTemplateResolver {
    private readonly exerciseTemplateService;
    constructor(exerciseTemplateService: ExerciseTemplateService);
    getAllExerciseTemplates(): Promise<ExerciseTemplate[]>;
}
