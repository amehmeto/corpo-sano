import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/entities/exercise.entity'

export const WORKOUT_REPOSITORY = 'WORKOUT_REPOSITORY'

export interface WorkoutRepository {
  find(): Promise<Workout[]>
  save(workout: Partial<Workout>): Promise<Workout>
  findById(id: string): Promise<Workout>
  getExercises(workoutId: string): Promise<Exercise[]>
  scheduleWorkout(
    workoutId: string,
    daysOfTheWeek: WeekDays[],
  ): Promise<Workout>
}
