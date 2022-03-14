import { ExerciseTemplate } from '../entities/exercise-template.entity';
export declare function exerciseDataBuilder(exercise?: {}): {
    template: ExerciseTemplate;
    position: number;
    numberOfSets: number;
    numberOfReps: number;
    interSetsRestTime: number;
    finalRestTime: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    version: number;
};
export declare const exerciseFixtures: {
    template: ExerciseTemplate;
    position: number;
    numberOfSets: number;
    numberOfReps: number;
    interSetsRestTime: number;
    finalRestTime: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    version: number;
}[];
