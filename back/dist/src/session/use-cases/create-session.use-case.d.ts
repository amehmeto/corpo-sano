import { CreateSessionInput } from '../types/create-session.input';
import { Session } from '../entities/session.entity';
import { SessionRepository } from '../repositories/session.repository.interface';
import { WorkoutRepository } from '../../workout/repositories/workout.repository.interface';
import { PerformanceRepository } from '../../performance/repositories/performance.repository.interface';
export declare class CreateSessionUseCase {
    private readonly sessionRepository;
    private readonly workoutRepository;
    private readonly performanceRepository;
    constructor(sessionRepository: SessionRepository, workoutRepository: WorkoutRepository, performanceRepository: PerformanceRepository);
    execute(createSessionInput: CreateSessionInput): Promise<Session>;
    private savePerformance;
}
