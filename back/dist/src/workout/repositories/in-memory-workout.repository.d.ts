import { WorkoutRepository } from './workout.repository.interface';
import { Workout } from '../entities/workout.entity';
import { WeekDays } from '../types/week-days.enum';
export declare class InMemoryWorkoutRepository implements WorkoutRepository {
    private workoutsData;
    private workouts;
    find(): Promise<Workout[]>;
    findById(id: string): Promise<Workout>;
    save(workout: Workout): Promise<Workout>;
    scheduleWorkout(workoutId: string, daysOfTheWeek: WeekDays[]): Promise<Workout>;
}
