import { ExerciseTemplate } from '../entities/exercise-template.entity';
export declare function exerciseInputDataBuilder(exerciseInput?: {}): {
    id: string;
    template: ExerciseTemplate;
    numberOfSets: number;
    numberOfReps: number;
    interSetsRestTime: number;
    finalRestTime: number;
    position: number;
};
