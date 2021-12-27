import { Session } from '../entities/session.entity'

export const SESSION_REPOSITORY = 'SESSION_REPOSITORY'

export interface SessionRepository {
  find(): Promise<Session[]>
  save(session: Partial<Session>): Promise<Session>
  findById(sessionId: string): Promise<Session>
}
