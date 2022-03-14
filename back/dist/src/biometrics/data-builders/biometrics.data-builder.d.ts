import { UnitSystem } from '../types/metric-system.enum';
import { Gender } from '../types/gender.enum';
import { WeightGoal } from '../types/weight-goal.enum';
export declare function biometricsDataBuilder(biometrics?: {}): {
    bodyFat: number;
    height: number;
    lengthUnit: UnitSystem;
    weight: number;
    weightUnit: UnitSystem;
    gender: Gender;
    birthday: Date;
    weightGoal: WeightGoal;
};
export declare const biometricsFixture: {
    bodyFat: number;
    height: number;
    lengthUnit: UnitSystem;
    weight: number;
    weightUnit: UnitSystem;
    gender: Gender;
    birthday: Date;
    weightGoal: WeightGoal;
};
