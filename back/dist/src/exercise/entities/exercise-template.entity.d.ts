import { Exercise } from './exercise.entity';
export declare class ExerciseTemplate {
    id: string;
    title: string;
    exercises?: Exercise[];
    constructor(partial?: Partial<ExerciseTemplate>);
}
