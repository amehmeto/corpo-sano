import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from '../types/workout-repository.interface'
import { ExerciseTemplate } from '../../exercise-template/entities/exercise-template.entity'

@EntityRepository(Workout)
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  async findById(workoutId: string): Promise<Workout> {
    return this.findOne(workoutId)
  }

  async getExercises(workoutId: string): Promise<ExerciseTemplate[]> {
    const workout = await this.findOne(workoutId)
    return workout.exercises
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
