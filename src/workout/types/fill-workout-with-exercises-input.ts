import { Exercise } from "src/exercise/types/exercise.type";

export type FillWorkoutWithExercisesInput = {
    workoutId: string,
    exercises: Exercise[],
}