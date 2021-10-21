import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender } from '../types/gender.enum'
import { MetricUnit } from '../types/metric-system.enum'
import { WeightUnit } from '../types/weight-unit.enum'
import { WeightGoal } from '../types/weight-goal.enum'

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  height: number

  @Column()
  metricUnit: MetricUnit

  @Column()
  weight: number

  @Column()
  weightUnit: WeightUnit

  @Column()
  gender: Gender

  @Column()
  birthday: Date

  @Column()
  weightGoal: WeightGoal

  @Column()
  email: string

  @Column()
  password: string

  constructor(partial: Partial<Athlete> = {}) {
    Object.assign(this, partial)
  }
}
