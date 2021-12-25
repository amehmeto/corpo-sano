import { Inject, Injectable } from '@nestjs/common'
import { CreateSessionInput } from '../types/create-session.input'
import { Session } from '../entities/session.entity'
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../repositories/session.repository.interface'
import { v4 as uuid } from 'uuid'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../../workout/repositories/workout.repository.interface'
import { Performance } from '../../performance/entities/performance.entity'
import {
  PERFORMANCE_REPOSITORY,
  PerformanceRepository,
} from '../../performance/repositories/performance.repository.interface'
import { PerformanceInput } from '../../performance/types/performance.input'

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
    @Inject(PERFORMANCE_REPOSITORY)
    private readonly performanceRepository: PerformanceRepository,
  ) {}

  async execute(createSessionInput: CreateSessionInput): Promise<Session> {
    const { workoutId, performances } = createSessionInput
    const workout = await this.workoutRepository.findById(workoutId)
    const savedPerformances = await Promise.all(
      performances.map(async (perf) => this.savePerformance(perf)),
    )

    const session = new Session({
      id: uuid(),
      workout,
      performances: savedPerformances,
    })
    return this.sessionRepository.save(session)
  }

  private savePerformance(perf: PerformanceInput) {
    const performance = new Performance(perf)
    return this.performanceRepository.save(performance)
  }
}
