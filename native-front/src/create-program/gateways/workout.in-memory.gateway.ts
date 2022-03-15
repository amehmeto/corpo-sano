import { WorkoutGateway } from './workout.gateway.interface'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { workoutDataBuilder } from '../../_data-builders/workout.data-builder'
import { WorkoutInput } from '../usecases/create-workout-use.case'
import { v4 as uuid } from 'uuid'
import { ScheduledDay, Workout } from '../entities/workout.entity'
import { ProgramGateway } from './program.gateway.interface'
import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { WorkoutMapper } from '../mappers/workout.mapper'
import { scheduledDaysDataBuilder } from '../../_data-builders/scheduled-days.data-builder'

export class InMemoryWorkoutGateway implements WorkoutGateway {
  private rawWorkouts = [
    workoutDataBuilder({
      exercises: [
        exerciseDataBuilder(),
        exerciseDataBuilder(),
        exerciseDataBuilder(),
        exerciseDataBuilder(),
      ],
    }),
  ]
  private workouts = this.rawWorkouts.map((workout) => {
    return WorkoutMapper.mapToDomain(workout)
  })

  constructor(private readonly programGateway: ProgramGateway) {}

  update(workoutId: string, workout: Workout): Promise<boolean> {
    return Promise.resolve(true)
  }

  find(): Promise<Workout[]> {
    return Promise.resolve(this.workouts)
  }

  fillWithExercises(
    workoutId: string,
    exerciseTemplates: ExerciseTemplate[],
  ): Promise<boolean> {
    return Promise.resolve(false)
  }

  scheduleDays(workoutId: string, days: ScheduledDay[]): Promise<boolean> {
    return Promise.resolve(true)
  }

  create(workoutInput: WorkoutInput): Promise<Workout> {
    const createdWorkout = new Workout(
      uuid(),
      workoutInput.title,
      workoutInput.description,
      workoutInput.programId,
      [],
      scheduledDaysDataBuilder(),
    )
    this.workouts.push(createdWorkout)
    return Promise.resolve(createdWorkout)
  }

  async findById(workoutId: string): Promise<Workout> {
    //await this.updateWorkouts()

    /*const workout = this.workouts.find((_workout) => _workout.id === workoutId)
    if (!workout) throw new Error('Workout not found')*/
    return Promise.resolve(this.workouts[0])
  }

  private async updateWorkouts() {
    const programs = await this.programGateway.find()

    this.workouts = programs.reduce(
      (cumulativeWorkouts, program) =>
        cumulativeWorkouts.concat(program.workouts),
      [] as Workout[],
    )
  }
}
