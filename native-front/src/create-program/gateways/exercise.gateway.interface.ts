import { Exercise } from '../entities/exercise.entity'

export interface ExerciseGateway {
  findById(exerciseId: string): Promise<Exercise | undefined>
  deleteExercise(exerciseId: string): Promise<boolean>
}
