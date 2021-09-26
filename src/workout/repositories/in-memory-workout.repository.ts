import { WorkoutRepository } from '../types/workout-repository.interface'
import { Workout } from '../entities/workout.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { WeekDays } from '../types/week-days.enum'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  findById(id: string): Promise<Workout> {
    return Promise.resolve(new Workout({ id }))
  }

  getExercises(workoutId: string): Promise<Exercise[]> {
    return Promise.resolve([
      {
        id: workoutId,
        title: 'Push ups',
      },
    ])
  }

  save(workout: Workout): Promise<Workout> {
    return Promise.resolve({
      id: 'qwerty',
      ...workout,
    })
  }

  findOne(id: string): Promise<Workout> {
    return Promise.resolve(new Workout({ id }))
  }

  scheduleWorkout(
    workoutId: string,
    daysOfTheWeek: WeekDays[],
  ): Promise<Workout> {
    return Promise.resolve(
      new Workout({
        id: workoutId,
        scheduledDays: daysOfTheWeek,
      }),
    )
  }
}
