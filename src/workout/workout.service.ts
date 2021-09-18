import { Injectable } from '@nestjs/common'
import { Workout } from './entities/workout.entity'
import { Exercise } from '../exercise/entities/exercise.entity'
import { WorkoutInput } from './types/workout-input'
import { v4 as uuid } from 'uuid'
import { WorkoutRepository } from './types/workout-repository.interface'
import { FillWorkoutWithExercisesInput } from './types/fill-workout-with-exercises.input'
import { ExerciseRepository } from '../exercise/types/exercise-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(TypeOrmWorkoutRepository)
    private readonly workoutRepository: WorkoutRepository,
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
    const { workoutId, exercisesId } = fillWorkoutWithExercisesInput

    const workout = await this.workoutRepository.findById(workoutId)
    workout.exercises = await Promise.all(
      exercisesId.map(async (exerciseId) =>
        this.exerciseRepository.findById(exerciseId),
      ),
    )

    return this.workoutRepository.save(workout)
  }

  getExercises(workoutId: string): Promise<Exercise[]> {
    return this.workoutRepository.getExercises(workoutId)
  }
}
