import { WorkoutRepository } from './workout-repository.interface'
import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  private workouts = [
    new Workout({
      id: '872edf9d-5bfa-42ac-abdd-2411b0b0e2de',
      title: 'Haut du bas',
    }),
  ]

  findById(id: string): Promise<Workout> {
    return Promise.resolve(this.workouts.find((workout) => workout.id === id))
  }

  getExercises(workoutId: string): Promise<any[]> {
    return Promise.resolve([
      {
        workoutId,
      },
    ])
  }

  save(workout: Workout): Promise<Workout> {
    return Promise.resolve(
      new Workout({
        id: '4f58abaf-e026-47c8-be10-0eab9a017b07', // random
        ...workout,
      }),
    )
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
