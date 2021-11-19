import { Column, Entity } from 'typeorm'
import { Gender } from '../types/gender.enum'
import { UnitSystem } from '../types/metric-system.enum'
import { WeightGoal } from '../types/weight-goal.enum'
import { Base } from '../../__infrastructure__/typeorm/base.entity'

@Entity()
export class Athlete extends Base {
  @Column()
  name: string

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

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  constructor(partial: Partial<Athlete> = {}) {
    super()
    Object.assign(this, partial)
  }
}
