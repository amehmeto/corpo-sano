import { SessionRepository } from './session.repository.interface';
import { Session } from '../entities/session.entity';
export declare class InMemorySessionRepository implements SessionRepository {
    save(createSessionInput: Partial<Session>): Promise<Session>;
}
