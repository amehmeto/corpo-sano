import { Workout } from '../../workout/entities/workout.entity';
import { Program } from '../entities/program.entity';
export declare function programDataBuilder(program?: {}): {
    id: string;
    title: string;
    workouts: Workout[];
};
export declare const programFixture: {
    id: string;
    title: string;
    workouts: Workout[];
};
export declare const programFixtures: Program[];
