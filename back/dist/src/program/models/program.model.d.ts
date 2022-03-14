import { Workout } from '../../workout/models/workout.model';
import { Athlete } from '../../athlete/models/athlete.model';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
export declare class Program extends BaseModel {
    title: string;
    workouts: Workout[];
    athlete: Athlete;
}
