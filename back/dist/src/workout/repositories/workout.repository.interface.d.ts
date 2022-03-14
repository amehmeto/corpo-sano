import { Workout } from '../entities/workout.entity';
import { WeekDays } from '../types/week-days.enum';
export declare const WORKOUT_REPOSITORY = "WORKOUT_REPOSITORY";
export interface WorkoutRepository {
    find(): Promise<Workout[]>;
    save(workout: Partial<Workout>): Promise<Workout>;
    findById(id: string): Promise<Workout>;
    scheduleWorkout(workoutId: string, daysOfTheWeek: WeekDays[]): Promise<Workout>;
}
