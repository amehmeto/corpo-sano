import { EntityRepository, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from './workout.repository.interface'

@EntityRepository(Workout)
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  findByProgramId(programId: string): Promise<Workout[]> {
    throw new Error('Method not implemented.')
  }

  async findById(workoutId: string): Promise<Workout> {
    const workout = await this.findOne(workoutId, {
      relations: ['exercises', 'sessions'],
    })
    workout.exercises.sort((a, b) => this.sortByCreatedAt(a, b))
    workout.sessions.sort((a, b) => this.sortByCreatedAt(a, b))
    return workout
  }

  private sortByCreatedAt(a: any, b: any) {
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
