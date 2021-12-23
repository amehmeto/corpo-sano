import { Column, Entity } from 'typeorm'
import { Gender } from '../types/gender.enum'
import { UnitSystem } from '../types/metric-system.enum'
import { WeightGoal } from '../types/weight-goal.enum'
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity'

@Entity()
export class Biometrics extends BaseEntity {
  @Column()
  height: number

  @Column()
  lengthUnit: UnitSystem

  @Column()
  weight: number

  @Column()
  weightUnit: UnitSystem

  @Column({ nullable: true })
  bodyFat: number

  @Column()
  gender: Gender

  @Column()
  birthday: Date

  @Column()
  weightGoal: WeightGoal

  constructor(partial: Partial<Biometrics> = {}) {
    super()
    Object.assign(this, partial)
  }
}
