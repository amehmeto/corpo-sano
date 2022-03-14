import { Session } from '../entities/session.entity';
import { Performance } from '../../performance/entities/performance.entity';
export declare function sessionDataBuilder(session?: {}): {
    id: string;
    performances: Performance[];
};
export declare const sessionFixture: Session;
export declare const sessionFixtures: Session[];
