import { WorkoutGateway } from './workout.gateway.interface'
import { ScheduledDay, Workout } from '../entities/workout.entity'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { workoutDataBuilder } from '../../_data-builders/workout.data-builder'
import { WorkoutMapper } from '../mappers/workout.mapper'

export class InMemoryWorkoutGatewayStub implements WorkoutGateway {
  private rawWorkouts = [
    workoutDataBuilder(),
    workoutDataBuilder(),
    workoutDataBuilder(),
  ]
  private workouts: Workout[] = this.rawWorkouts.map((workout) =>
    WorkoutMapper.mapToDomain(workout),
  )

  create(workoutInput: Partial<any>): Promise<Workout> {
    const createdWorkout = workoutDataBuilder({
      ...workoutInput,
      id: '1',
    })
    const mappedWorkout = WorkoutMapper.mapToDomain(createdWorkout)
    this.workouts.push(mappedWorkout)
    return Promise.resolve(mappedWorkout)
  }

  fillWithExercises(
    workoutId: string,
    exerciseTemplates: ExerciseTemplate[],
  ): Promise<boolean> {
    return Promise.resolve(false)
  }

  find(): Promise<Workout[]> {
    return Promise.resolve(this.workouts)
  }

  findById(workoutId: string): Promise<Workout> {
    const workout = this.workouts.find((_workout) => _workout.id === workoutId)
    if (!workout) throw new Error('Workout not found')
    return Promise.resolve(workout)
  }

  scheduleDays(workoutId: string, days: ScheduledDay[]): Promise<boolean> {
    throw new Error('Method not implemented.')
    //return Promise.resolve(false)
  }

  update(workoutId: string, workout: Partial<Workout>): Promise<boolean> {
    const workoutIndex = this.workouts.findIndex(
      (_workout) => _workout.id === workoutId,
    )
    const updatedWorkout = { ...this.workouts[workoutIndex], ...workout }
    const mappedWorkout = WorkoutMapper.mapToDomain(updatedWorkout)
    this.workouts[workoutIndex] = mappedWorkout
    return Promise.resolve(true)
  }
}
