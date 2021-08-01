import { Workout } from '../entities/workout.entity'

export const WORKOUT_REPOSITORY = 'WorkoutRepository'

export interface WorkoutRepository {
  save(workout: Workout): Promise<Workout>
  findById(id: string): Promise<Workout>
}