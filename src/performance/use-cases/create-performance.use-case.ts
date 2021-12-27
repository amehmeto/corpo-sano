import { Inject, Injectable } from '@nestjs/common'
import { Performance } from '../entities/performance.entity'
import { CreatePerformanceInput } from '../types/create-performance.input'
import {
  PERFORMANCE_REPOSITORY,
  PerformanceRepository,
} from '../repositories/performance.repository.interface'
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../session/repositories/session.repository.interface'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../../exercise/repositories/exercise-repository.interface'

@Injectable()
export class CreatePerformanceUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
    @Inject(PERFORMANCE_REPOSITORY)
    private readonly performanceRepository: PerformanceRepository,
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async execute(
    createPerformanceInput: CreatePerformanceInput,
  ): Promise<Performance> {
    const { sessionId, exerciseId, performance } = createPerformanceInput
    const session = await this.sessionRepository.findById(sessionId)
    const exercise = await this.exerciseRepository.findById(exerciseId)
    const newPerformance = new Performance({
      session,
      exercise,
      sets: [performance],
    })
    return this.performanceRepository.save(newPerformance)
  }
}
