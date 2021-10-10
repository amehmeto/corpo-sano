import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from '../types/workout-repository.interface'
import { Exercise } from '../../exercise/entities/exercise.entity'

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
    return workout.exercises.sort((a, b) => {
      if (a.createAt > b.createAt) return 1
      if (a.createAt < b.createAt) return -1
      return 0
    })
  }

  async scheduleWorkout(
    workoutId: string,
    daysOfTheWeek: any[],
  ): Promise<Workout> {
    const workout = await this.findOne(workoutId)
    workout.scheduledDays = daysOfTheWeek
    return this.save(workout)
  }
}
