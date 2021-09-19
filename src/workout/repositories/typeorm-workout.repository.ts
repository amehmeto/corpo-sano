import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from '../types/workout-repository.interface'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { WeekDays } from '../types/week-days.enum'

@EntityRepository(Workout)
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  async findById(workoutId: string): Promise<Workout> {
    return this.findOne(workoutId)
  }

  async getExercises(workoutId: string): Promise<Exercise[]> {
    const workout = await this.findOne(workoutId)
    return workout.exercises
  }

  scheduleWorkout(daysOfTheWeek: WeekDays[]): Promise<Workout> {
    return Promise.resolve(undefined)
  }
}
