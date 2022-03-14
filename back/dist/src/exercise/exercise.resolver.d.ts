import { Exercise } from './models/exercise.model';
import { ExerciseService } from './exercise.service';
import { ExerciseDetailsInput } from './types/exercise-details.input';
export declare class ExerciseResolver {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    getExercise(exerciseId: string): Promise<Exercise>;
    saveExerciseDetails(exerciseDetailsInput: ExerciseDetailsInput): Promise<Exercise>;
    deleteExercise(exerciseId: string): Promise<any>;
}
