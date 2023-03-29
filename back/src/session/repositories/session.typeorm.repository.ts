import { DataSource, Repository } from 'typeorm'
import { Session } from '../entities/session.entity'
import { SessionRepository } from './session.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeOrmSessionRepository
  extends Repository<Session>
  implements SessionRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Session, dataSource.manager)
  }
}
