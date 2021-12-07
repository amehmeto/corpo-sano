import { Session } from '../entities/session.entity'

export interface SessionRepository {
  save(session: Session): Promise<Session>
}
