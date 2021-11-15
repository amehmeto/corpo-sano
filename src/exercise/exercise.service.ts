import { Inject, Injectable } from '@nestjs/common'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from './repositories/exercise-repository.interface'
import { ExerciseDetailsInput } from './types/exercise-details.input'
import { Exercise } from './entities/exercise.entity'

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async saveDetails(
    exerciseDetailsInput: ExerciseDetailsInput,
  ): Promise<Exercise> {
    const { exerciseId } = exerciseDetailsInput
    delete exerciseDetailsInput.exerciseId
    return this.exerciseRepository.save({
      id: exerciseId,
      ...exerciseDetailsInput,
    })
  }

  async getExercise(exerciseId: string): Promise<Exercise> {
    return this.exerciseRepository.findById(exerciseId)
  }
}
