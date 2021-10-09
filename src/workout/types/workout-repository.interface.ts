import { Workout } from '../entities/workout.entity'
import { ExerciseTemplate } from '../../exercise-template/entities/exercise-template.entity'
import { WeekDays } from './week-days.enum'

export interface WorkoutRepository {
  save(workout: Workout): Promise<Workout>
  findById(id: string): Promise<Workout>
  getExercises(workoutId: string): Promise<ExerciseTemplate[]>
  scheduleWorkout(
    workoutId: string,
    daysOfTheWeek: WeekDays[],
  ): Promise<Workout>
}
