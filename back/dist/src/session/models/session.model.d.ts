import { Performance } from '../../performance/models/performance.model';
import { Workout } from '../../workout/models/workout.model';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
export declare class Session extends BaseModel {
    performances: Performance[];
    workout: Workout;
}
