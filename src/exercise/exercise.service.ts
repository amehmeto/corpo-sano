import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Exercise } from './entities/exercise.entity'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import {
  ExerciseRepository,
  EXERCISE_REPOSITORY,
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
