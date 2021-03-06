import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'
import { UpdateResult } from 'typeorm'

export const WORKOUT_REPOSITORY = 'WORKOUT_REPOSITORY'

export interface WorkoutRepository {
  find(): Promise<Workout[]>
  save(workout: Partial<Workout>): Promise<Workout>
  findById(id: string): Promise<Workout>
  findByProgramId(programId: string): Promise<Workout[]>
  scheduleWorkout(
    workoutId: string,
    daysOfTheWeek: WeekDays[],
  ): Promise<Workout>
  softDelete(id: string): Promise<UpdateResult>
}
