import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseRepository } from './exercise-repository.interface';
export declare class TypeOrmExerciseRepository extends Repository<Exercise> implements ExerciseRepository {
    findById(id: string): Promise<Exercise>;
}
