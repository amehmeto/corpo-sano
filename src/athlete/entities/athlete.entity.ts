import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender } from '../types/gender.enum'
import { MetricUnit } from '../types/metric-system.enum'
import { WeightUnit } from '../types/weight-unit.enum'
import { WeightGoal } from '../types/weight-goal.enum'

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 0 })
  height: number

  @Column({ default: MetricUnit.METRE })
  metricUnit: MetricUnit

  @Column({ default: 0 })
  weight: number

  @Column({ default: WeightUnit.KILOGRAM })
  weightUnit: WeightUnit

  @Column({ default: Gender.FEMALE })
  gender: Gender

  // TODO: bypass after trying to use { type: 'timestamp', default: new Date() }
  @Column({ nullable: true })
  birthday: Date

  @Column({ default: WeightGoal.SLOW_LOSS })
  weightGoal: WeightGoal

  @Column({ default: 'default@email.com' })
  email: string

  @Column({ default: 'azerty' })
  password: string

  constructor(partial: Partial<Athlete> = {}) {
    Object.assign(this, partial)
  }
}
