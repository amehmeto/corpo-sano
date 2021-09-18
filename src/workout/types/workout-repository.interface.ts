import { Workout } from '../entities/workout.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'

export interface WorkoutRepository {
  save(workout: Workout): Promise<Workout>
  findById(id: string): Promise<Workout>
  getExercises(workoutId: string): Promise<Exercise[]>
}
