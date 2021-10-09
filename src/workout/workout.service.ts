import { Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { ExerciseTemplate } from '../exercise-template/entities/exercise-template.entity'
import { WorkoutInput } from './types/workout-input'
import { v4 as uuid } from 'uuid'
import { WorkoutRepository } from './types/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { ExerciseTemplateRepository } from '../exercise-template/types/exercise-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise-template/repositories/type-orm-exercise-template.repository'
import { ScheduleWorkoutInput } from './types/schedule-workout.input'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(TypeOrmWorkoutRepository)
    private readonly workoutRepository: WorkoutRepository,
    @InjectRepository(TypeOrmExerciseTemplateRepository)
    private readonly exerciseRepository: ExerciseTemplateRepository,
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
    const { workoutId, exercisesId } = fillWorkoutWithExercisesInput

    const workout = await this.workoutRepository.findById(workoutId)
    workout.exercises = await Promise.all(
      exercisesId.map(async (exerciseId) =>
        this.exerciseRepository.findById(exerciseId),
      ),
    )

    return this.workoutRepository.save(workout)
  }

  getExercises(workoutId: string): Promise<ExerciseTemplate[]> {
    return this.workoutRepository.getExercises(workoutId)
  }

  async scheduleWorkout(
    scheduleWorkoutInput: ScheduleWorkoutInput,
  ): Promise<Workout> {
    const { daysOfTheWeek, workoutId } = scheduleWorkoutInput
    return this.workoutRepository.scheduleWorkout(workoutId, daysOfTheWeek)
  }
}
