import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { ScheduledDay, Workout } from '../entities/workout.entity'

export interface WorkoutGateway {
  fillWithExercises(
    workoutId: string,
    exerciseTemplates: ExerciseTemplate[],
  ): Promise<boolean>
  scheduleDays(workoutId: string, days: ScheduledDay[]): Promise<boolean>
  create(workoutInput: Partial<any>): Promise<Workout>
  findById(workoutId: string): Promise<Workout>
  find(): Promise<Workout[]>
  update(workoutId: string, workout: Workout): Promise<boolean>
}
