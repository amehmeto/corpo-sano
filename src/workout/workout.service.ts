import { Inject, Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { v4 as uuid } from 'uuid'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './repositories/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from '../exercise/repositories/exercise-template-repository.interface'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'
import { Exercise } from '../exercise/entities/exercise.entity'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../exercise/repositories/exercise-repository.interface'
import { WorkoutInput } from './types/workout-input.type'
import { UpdateWorkoutInput } from './types/update-workout.input'

@Injectable()
export class WorkoutService {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
    @Inject(EXERCISE_TEMPLATE_REPOSITORY)
    private readonly exerciseTemplateRepository: ExerciseTemplateRepository,
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async create(workoutInput: WorkoutInput): Promise<Workout> {
    const workout = new Workout({
      id: uuid(),
      title: workoutInput.title,
    })
    return this.workoutRepository.save(workout)
  }

  async fillWorkoutWithExercises(
    fillWorkoutWithExercisesInput: FillWorkoutWithExercisesInput,
  ): Promise<Workout> {
    const { workoutId, exerciseTemplateIds } = fillWorkoutWithExercisesInput

    const workout = await this.workoutRepository.findById(workoutId)
    workout.exercises = await Promise.all(
      exerciseTemplateIds.map(async (exerciseId) => {
        const template = await this.exerciseTemplateRepository.findById(
          exerciseId,
        )
        const exercise = new Exercise({ id: uuid(), template })
        return this.exerciseRepository.save(exercise)
      }),
    )
    return this.workoutRepository.save(workout)
  }

  getExercises(workoutId: string): Promise<Exercise[]> {
    return this.workoutRepository.getExercises(workoutId)
  }

  async scheduleWorkout(
    scheduleWorkoutInput: ScheduleWorkoutInput,
  ): Promise<Workout> {
    const { daysOfTheWeek, workoutId } = scheduleWorkoutInput
    return this.workoutRepository.scheduleWorkout(workoutId, daysOfTheWeek)
  }

  async getById(workoutId: string): Promise<Workout> {
    return this.workoutRepository.findById(workoutId)
  }

  async update(newWorkout: UpdateWorkoutInput): Promise<Workout> {
    const workout = await this.workoutRepository.save(
      newWorkout as unknown as Workout,
    )
    if (!workout.exercises) workout.exercises = []
    return workout
  }
}
