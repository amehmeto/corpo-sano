import { Gender } from '../types/gender.enum';
import { UnitSystem } from '../types/metric-system.enum';
import { WeightGoal } from '../types/weight-goal.enum';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
export declare class Biometrics extends BaseModel {
    height: number;
    bodyFat: number;
    lengthUnit: UnitSystem;
    weight: number;
    weightUnit: UnitSystem;
    gender: Gender;
    birthday: Date;
    weightGoal: WeightGoal;
}
