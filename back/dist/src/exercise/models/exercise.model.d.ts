import { ExerciseTemplate } from './exercise-template.model';
import { Workout } from '../../workout/models/workout.model';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
import { Performance } from '../../performance/models/performance.model';
export declare class Exercise extends BaseModel {
    template: ExerciseTemplate;
    numberOfSets: number;
    numberOfReps: number;
    finalRestTime: number;
    interSetsRestTime: number;
    position: number;
    workout: Workout;
    performances: Performance[];
}
