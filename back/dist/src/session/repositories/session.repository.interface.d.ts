import { Session } from '../entities/session.entity';
export declare const SESSION_REPOSITORY = "SESSION_REPOSITORY";
export interface SessionRepository {
    save(session: Partial<Session>): Promise<Session>;
}
