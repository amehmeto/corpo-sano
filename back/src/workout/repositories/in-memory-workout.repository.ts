import { WorkoutRepository } from './workout.repository.interface'
import { Workout } from '../entities/workout.entity'
import { WeekDays } from '../types/week-days.enum'
import { workoutDataBuilder } from '../data-builders/workout.data-builder'
import { exerciseDataBuilder } from '../../exercise/data-builders/exercise.data-builder'
import { sessionDataBuilder } from '../../session/data-builders/session.data-builder'
import { performanceDataBuilder } from '../../performance/data-builders/performance.data-builder'
import { UpdateResult } from 'typeorm'

export class InMemoryWorkoutRepository implements WorkoutRepository {
  private workoutsData = [
    workoutDataBuilder({
      exercises: [
        exerciseDataBuilder(),
        exerciseDataBuilder(),
        exerciseDataBuilder(),
      ],
      sessions: [
        sessionDataBuilder({
          performances: [performanceDataBuilder()],
        }),
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

  softDelete(workoutId: string): Promise<UpdateResult> {
    const softDeletedWorkout = new UpdateResult()
    return Promise.resolve(softDeletedWorkout)
  }
}
