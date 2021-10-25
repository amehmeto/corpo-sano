import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender } from '../types/gender.enum'
import { UnitSystem } from '../types/metric-system.enum'
import { WeightGoal } from '../types/weight-goal.enum'

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string

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
