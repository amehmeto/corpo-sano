import { Workout } from './entities/workout.entity';
import { WorkoutRepository } from './repositories/workout.repository.interface';
import { ExerciseTemplateRepository } from '../exercise/repositories/exercise-template-repository.interface';
import { ScheduleWorkoutInput } from './types/schedule-workout.input';
import { ExerciseRepository } from '../exercise/repositories/exercise-repository.interface';
import { WorkoutInput } from './types/workout-input.type';
import { UpdateWorkoutInput } from './types/update-workout.input';
import { PatchWorkoutInput } from './types/patch-workout.input';
export declare class WorkoutService {
    private readonly workoutRepository;
    private readonly exerciseTemplateRepository;
    private readonly exerciseRepository;
    constructor(workoutRepository: WorkoutRepository, exerciseTemplateRepository: ExerciseTemplateRepository, exerciseRepository: ExerciseRepository);
    create(workoutInput: WorkoutInput): Promise<Workout>;
    scheduleWorkout(scheduleWorkoutInput: ScheduleWorkoutInput): Promise<Workout>;
    getById(workoutId: string): Promise<Workout>;
    update(newWorkout: UpdateWorkoutInput): Promise<Workout>;
    patch(workoutId: string, workoutModifications: PatchWorkoutInput): Promise<Workout>;
}
