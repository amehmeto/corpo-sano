import { Inject, Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { v4 as uuid } from 'uuid'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './repositories/workout.repository.interface'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from '../exercise/repositories/exercise-template.repository.interface'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../exercise/repositories/exercise-repository.interface'
import { WorkoutInput } from './types/workout-input.type'
import { UpdateWorkoutInput } from './types/update-workout.input'
import { PatchWorkoutInput } from './types/patch-workout.input'
import { UpdateResult } from 'typeorm'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from '../program/repositories/program-repository.interface'

@Injectable()
export class WorkoutService {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
    @Inject(EXERCISE_TEMPLATE_REPOSITORY)
    private readonly exerciseTemplateRepository: ExerciseTemplateRepository,
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
    @Inject(PROGRAM_REPOSITORY)
    private readonly programRepository: ProgramRepository,
  ) {}

  async create(workoutInput: WorkoutInput): Promise<Workout> {
    const workout = new Workout({
      id: uuid(),
      title: workoutInput.title,
    })

    const createdWorkout = await this.workoutRepository.save(workout)

    await this.programRepository.updateProgram(
      workoutInput.programId,
      createdWorkout,
    )
    return createdWorkout
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
    const workout = await this.workoutRepository.save(new Workout(newWorkout))
    if (!workout.exercises) workout.exercises = []
    return workout
  }

  async patch(
    workoutId: string,
    workoutModifications: PatchWorkoutInput,
  ): Promise<Workout> {
    const retrievedWorkout = await this.workoutRepository.findById(workoutId)

    return this.workoutRepository.save({
      ...retrievedWorkout,
      ...(workoutModifications as Partial<Workout>),
    })
  }

  async softDelete(workoutId: string): Promise<UpdateResult> {
    return this.workoutRepository.softDelete(workoutId)
  }
}
