import { WorkoutRepository } from '../repositories/workout.repository.interface';
import { ExerciseTemplateRepository } from '../../exercise/repositories/exercise-template-repository.interface';
import { ExerciseRepository } from '../../exercise/repositories/exercise-repository.interface';
import { FillWorkoutWithExercisesInput } from '../types/fill-workout-with-exercises.input';
import { Workout } from '../entities/workout.entity';
export declare class FillWorkoutWithExercisesUseCase {
    private readonly workoutRepository;
    private readonly exerciseTemplateRepository;
    private readonly exerciseRepository;
    constructor(workoutRepository: WorkoutRepository, exerciseTemplateRepository: ExerciseTemplateRepository, exerciseRepository: ExerciseRepository);
    execute(fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput): Promise<Workout>;
    private hydrateExercise;
}
