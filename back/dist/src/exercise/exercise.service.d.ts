import { ExerciseRepository } from './repositories/exercise-repository.interface';
import { ExerciseDetailsInput } from './types/exercise-details.input';
import { Exercise } from './entities/exercise.entity';
import { UpdateResult } from 'typeorm';
export declare class ExerciseService {
    private readonly exerciseRepository;
    constructor(exerciseRepository: ExerciseRepository);
    saveDetails(exerciseDetailsInput: ExerciseDetailsInput): Promise<Exercise>;
    getExercise(exerciseId: string): Promise<Exercise>;
    softDelete(exerciseId: string): Promise<UpdateResult>;
}
