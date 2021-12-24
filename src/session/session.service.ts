import { Inject, Injectable } from '@nestjs/common'
import { CreateSessionInput } from './types/create-session.input'
import { Session } from './entities/session.entity'
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from './repositories/session.repository.interface'
import { v4 as uuid } from 'uuid'

@Injectable()
export class SessionService {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async create(createSessionInput: CreateSessionInput): Promise<Session> {
    const session = new Session({
      id: uuid(),
      ...createSessionInput,
    })
    return this.sessionRepository.save(session)
  }
}
