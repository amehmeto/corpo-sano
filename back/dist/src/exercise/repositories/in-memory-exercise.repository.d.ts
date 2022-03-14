import { ExerciseRepository } from './exercise-repository.interface';
import { Exercise } from '../entities/exercise.entity';
import { UpdateResult } from 'typeorm';
export declare class InMemoryExerciseRepository implements ExerciseRepository {
    private exercisesData;
    private exercises;
    find(): Promise<Exercise[]>;
    findById(id: string): Promise<Exercise>;
    save(exercise: Partial<Exercise>): Promise<Exercise>;
    softDelete(id: string): Promise<UpdateResult>;
}
