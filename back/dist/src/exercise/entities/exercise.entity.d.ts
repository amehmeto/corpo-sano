import { ExerciseTemplate } from './exercise-template.entity';
import { Workout } from '../../workout/entities/workout.entity';
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Performance } from '../../performance/entities/performance.entity';
export declare class Exercise extends BaseEntity {
    template: ExerciseTemplate;
    numberOfSets: number;
    numberOfReps: number;
    interSetsRestTime: number;
    finalRestTime: number;
    position: number;
    workout: Workout;
    performances: Performance[];
    constructor(partial?: Partial<Exercise>);
}
