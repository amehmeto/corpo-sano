import { Injectable } from '@nestjs/common'
import { Exercise } from './entities/exercise.entity'

@Injectable()
export class ExerciseService {
  getAllExercises(): Promise<Exercise[]> {
    return Promise.all([
      { id: '0ef7340f-49a0-4d50-9b6f-a155bab5fe7b', title: 'Lunge' },
      { id: '226bd5cc-9bdb-49f0-a463-5fd3b26625af', title: 'Wall sit' },
    ])
  }
}
