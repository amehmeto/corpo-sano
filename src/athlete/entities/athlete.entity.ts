import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender } from '../types/gender.enum'

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  height: number

  @Column()
  weight: number

  @Column()
  gender: Gender

  @Column()
  birthday: Date

  constructor(partial: Partial<Athlete> = {}) {
    Object.assign(this, partial)
  }
}
