import { Workout } from './models/workout.model';
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input';
import { ScheduleWorkoutInput } from './types/schedule-workout.input';
import { WorkoutService } from './workout.service';
import { PatchWorkoutInput } from './types/patch-workout.input';
import { FillWorkoutWithExercisesUseCase } from './use-cases/fill-workout-with-exercises.use-case';
export declare class WorkoutResolver {
    private readonly workoutService;
    private readonly fillWorkoutWithExercisesUseCase;
    constructor(workoutService: WorkoutService, fillWorkoutWithExercisesUseCase: FillWorkoutWithExercisesUseCase);
    getWorkout(workoutId: string): Promise<Workout>;
    createWorkout(title: string, programId: string): Promise<Workout>;
    fillWorkoutWithExercises(payload: FillWorkoutWithExercisesInput): Promise<Workout>;
    scheduleWorkout(payload: ScheduleWorkoutInput): Promise<Workout>;
    updateWorkout(workoutId: string, payload: PatchWorkoutInput): Promise<Workout>;
}
