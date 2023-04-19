import { DataSource, Repository } from 'typeorm'
import { Workout } from '../entities/workout.entity'
import { WorkoutRepository } from './workout.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmWorkoutRepository
  extends Repository<Workout>
  implements WorkoutRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Workout, dataSource.manager)
  }
  findByProgramId(programId: string): Promise<Workout[]> {
    const workout = this.find({
      relations: ['program'],
      where: {
        program: {
          id: programId,
        },
      },
    })

    return Promise.resolve(workout)
  }

  async findById(workoutId: string): Promise<Workout> {
    const workout = await this.findOne({
      where: {
        id: workoutId,
      },
      relations: {
        exercises: true,
        sessions: true,
      },
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
    const workout = await this.findOneBy({ id: workoutId })
    workout.scheduledDays = daysOfTheWeek
    return this.save(workout)
  }
}
