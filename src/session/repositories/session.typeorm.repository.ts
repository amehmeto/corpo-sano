import { EntityRepository, Repository } from 'typeorm'
import { Session } from '../entities/session.entity'
import { SessionRepository } from './session.repository.interface'

@EntityRepository(Session)
export class TypeOrmSessionRepository
  extends Repository<Session>
  implements SessionRepository {}
