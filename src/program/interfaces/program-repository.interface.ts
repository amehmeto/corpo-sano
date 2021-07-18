import { WorkoutInput } from '../../workout/types/workout-input'
import { Workout } from '../../workout/entities/workout.entity'

export const PROGRAM_REPOSITORY = 'PROGRAM REPOSITORY'

export interface ProgramRepository {
  create(workoutInput: WorkoutInput): Promise<Workout>
}
