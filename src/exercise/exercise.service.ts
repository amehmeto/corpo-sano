import { Injectable } from '@nestjs/common'
import { Exercise } from './entities/exercise.entity'
import { ExerciseRepository } from './types/exercise-repository.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(TypeOrmExerciseRepository)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find()
  }
}
