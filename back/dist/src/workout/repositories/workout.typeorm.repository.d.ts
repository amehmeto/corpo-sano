import { Repository } from 'typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutRepository } from './workout.repository.interface';
export declare class TypeOrmWorkoutRepository extends Repository<Workout> implements WorkoutRepository {
    findById(workoutId: string): Promise<Workout>;
    private sortByCreatedAt;
    scheduleWorkout(workoutId: string, daysOfTheWeek: any[]): Promise<Workout>;
}
