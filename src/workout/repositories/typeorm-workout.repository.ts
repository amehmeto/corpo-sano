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

  getExercises(workoutId: string): Promise<Exercise[]> {
    return Promise.resolve([])
  }
}
