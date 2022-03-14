import { UnitSystem } from './metric-system.enum';
import { Gender } from './gender.enum';
import { WeightGoal } from './weight-goal.enum';
export declare class BiometricsInput {
    height: number;
    bodyFat: number;
    lengthUnit: UnitSystem;
    weight: number;
    weightUnit: UnitSystem;
    gender: Gender;
    birthday: Date;
    weightGoal: WeightGoal;
}
