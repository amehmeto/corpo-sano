import { WorkoutRepository } from './workout-repository.interface'
import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'
import { workoutDataBuilder } from '../../../test/data-builders/workout.data-builder'
import { exerciseDataBuilder } from '../../../test/data-builders/exercise.data-builder'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  private workoutsData = [
    workoutDataBuilder({
      exercises: [
        exerciseDataBuilder(),
        exerciseDataBuilder(),
        exerciseDataBuilder(),
      ],
    }),
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
