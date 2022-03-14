import { Gender } from '../types/gender.enum';
import { UnitSystem } from '../types/metric-system.enum';
import { WeightGoal } from '../types/weight-goal.enum';
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
export declare class Biometrics extends BaseEntity {
    height: number;
    lengthUnit: UnitSystem;
    weight: number;
    weightUnit: UnitSystem;
    bodyFat: number;
    gender: Gender;
    birthday: Date;
    weightGoal: WeightGoal;
    constructor(partial?: Partial<Biometrics>);
}
