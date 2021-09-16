import { Inject, Injectable } from '@nestjs/common'
import { Exercise } from './entities/exercise.entity'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from './types/exercise-repository.interface'

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find()
  }
}
