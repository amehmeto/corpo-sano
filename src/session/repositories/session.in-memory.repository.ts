import { SessionRepository } from './session.repository.interface'
import { v4 as uuid } from 'uuid'
import { Session } from '../entities/session.entity'

export class InMemorySessionRepository implements SessionRepository {
  async save(createSessionInput: Partial<Session>): Promise<Session> {
    return Promise.resolve(new Session({ ...createSessionInput, id: uuid() }))
  }
}
