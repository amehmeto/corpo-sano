import { UnitSystem } from '../../_data-builders/types/metric-system.enum'
import { Gender } from '../../_data-builders/types/gender.enum'
import { WeightGoal } from '../../_data-builders/types/weight-goal.enum'

export class Biometrics {
  constructor(
    public bodyFat: string,
    public readonly height: number,
    public readonly weight: number,
    public readonly lengthUnit: UnitSystem,
    public weightUnit: 'kg' | 'lbs',
    public readonly gender: Gender,
    public readonly birthday: Date,
    public readonly weightGoal: WeightGoal,
  ) {}
}
