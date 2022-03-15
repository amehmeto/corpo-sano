import { Program } from '../../create-program/entities/program.entity'
import { DailyTask } from './daily-task.entity'
import { Biometrics } from './biometrics.entity'
import { UnitSystem } from '../../_data-builders/types/metric-system.enum'

export class Athlete {
  public avatar: string = 'default'

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    avatar: string | undefined,
    public readonly biometrics: Biometrics,
    public readonly dailyTasks?: DailyTask[],
    public readonly programs?: Program[],
  ) {
    this.setWeightUnitMetric(biometrics.weightUnit)
    this.setAvatar(avatar)
  }

  private setWeightUnitMetric(weightUnit: string) {
    this.biometrics.weightUnit = weightUnit === UnitSystem.METRIC ? 'kg' : 'lbs'
  }

  private setAvatar(avatar: string | undefined) {
    this.avatar = avatar || 'default'
  }
}
