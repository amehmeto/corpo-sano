import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from './workout-repository.interface'
import { Exercise } from '../../exercise/entities/exercise.entity'

@EntityRepository(Workout)
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  async findById(workoutId: string): Promise<Workout> {
    const workout = await this.findOne(workoutId)
    workout.exercises.sort((a, b) => this.sortByCreatedAt(a, b))
    return workout
  }

  async getExercises(workoutId: string): Promise<Exercise[]> {
    const workout = await this.findOne(workoutId)
    return workout.exercises.sort((a, b) => this.sortByCreatedAt(a, b))
  }

  private sortByCreatedAt(a: Exercise, b: Exercise) {
    return a.createdAt >= b.createdAt ? 1 : -1
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
