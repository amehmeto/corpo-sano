import { Workout } from '../../workout/entities/workout.entity';
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Athlete } from '../../athlete/entities/athlete.entity';
export declare class Program extends BaseEntity {
    title: string;
    workouts: Workout[];
    athlete: Athlete;
    constructor(partial?: Partial<Program>);
}
