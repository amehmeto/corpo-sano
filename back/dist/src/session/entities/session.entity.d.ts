import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Workout } from '../../workout/entities/workout.entity';
import { Performance } from '../../performance/entities/performance.entity';
export declare class Session extends BaseEntity {
    workout: Workout;
    performances: Performance[];
    constructor(partial?: Partial<Session>);
}
