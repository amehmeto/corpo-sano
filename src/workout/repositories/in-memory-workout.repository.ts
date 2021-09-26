import { WorkoutRepository } from '../types/workout-repository.interface'
import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  findById(id: string): Promise<Workout> {
    return Promise.resolve(new Workout({ id }))
  }

  getExercises(workoutId: string): Promise<any[]> {
    return Promise.resolve([
      {
        workoutId,
      },
    ])
  }

  save(workout: Workout): Promise<Workout> {
    return Promise.resolve({
      id: '4f58abaf-e026-47c8-be10-0eab9a017b07', // random
      ...workout,
    })
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
