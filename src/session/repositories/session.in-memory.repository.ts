import { SessionRepository } from './session.repository.interface'
import { v4 as uuid } from 'uuid'
import { Session } from '../entities/session.entity'
import { sessionDataBuilder } from '../data-builders/session.data-builder'

export class InMemorySessionRepository implements SessionRepository {
  private sessionsData = [
    sessionDataBuilder(),
    sessionDataBuilder(),
    sessionDataBuilder(),
  ]
  private sessions = this.sessionsData.map((data) => new Session(data))

  async save(createSessionInput: Partial<Session>): Promise<Session> {
    return Promise.resolve(new Session({ ...createSessionInput, id: uuid() }))
  }

  async findById(sessionId: string): Promise<Session> {
    return Promise.resolve(
      this.sessions.find((session) => session.id === sessionId),
    )
  }

  find(): Promise<Session[]> {
    return Promise.resolve(this.sessions)
  }
}
