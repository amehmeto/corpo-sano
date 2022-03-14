import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { SessionRepository } from './session.repository.interface';
export declare class TypeOrmSessionRepository extends Repository<Session> implements SessionRepository {
}
