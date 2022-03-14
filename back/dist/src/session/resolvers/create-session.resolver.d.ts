import { CreateSessionUseCase } from '../use-cases/create-session.use-case';
import { CreateSessionInput } from '../types/create-session.input';
import { Session } from '../models/session.model';
export declare class CreateSessionResolver {
    private readonly createSessionUseCase;
    constructor(createSessionUseCase: CreateSessionUseCase);
    createSession(payload: CreateSessionInput): Promise<Session>;
}
