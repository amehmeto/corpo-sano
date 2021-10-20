import { Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { WorkoutInput } from './types/workout-input'
import { v4 as uuid } from 'uuid'
import { WorkoutRepository } from './repositories/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { ExerciseTemplateRepository } from '../exercise/types/exercise-template-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'
import { Exercise } from '../exercise/entities/exercise.entity'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { ExerciseRepository } from '../exercise/repositories/exercise-repository.interface'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(TypeOrmWorkoutRepository)
    private readonly workoutRepository: WorkoutRepository,
    @InjectRepository(TypeOrmExerciseTemplateRepository)
    private readonly exerciseTemplateRepository: ExerciseTemplateRepository,
    @InjectRepository(TypeOrmExerciseRepository)
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
}
