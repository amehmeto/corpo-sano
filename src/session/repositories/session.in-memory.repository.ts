import { SessionRepository } from './session.repository.interface'
import { v4 as uuid } from 'uuid'
import { CreateSessionInput } from '../types/create-session.input'
import { Session } from '../entities/session.entity'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../../workout/repositories/workout.repository.interface'
import { Inject } from '@nestjs/common'

export class InMemorySessionRepository implements SessionRepository {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: WorkoutRepository,
  ) {}

  async save(createSessionInput: CreateSessionInput): Promise<Session> {
    const { workoutId, performances } = createSessionInput
    const workout = await this.workoutRepository.findById(workoutId)
    return Promise.resolve(new Session({ workout, performances, id: uuid() }))
  }
}
