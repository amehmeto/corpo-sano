import { WorkoutRepository } from './workout-repository.interface'
import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'
import { workoutDataBuilder } from '../../../test/data-builders/workout.data-builder'
import * as Faker from 'faker'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  private workoutsData = [
    workoutDataBuilder(),
    workoutDataBuilder(),
    workoutDataBuilder(),
  ]
  private workouts = this.workoutsData.map((data) => new Workout(data))

  find(): Promise<Workout[]> {
    return Promise.resolve(this.workouts)
  }

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
        id: workout.id ?? Faker.datatype.uuid(),
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
