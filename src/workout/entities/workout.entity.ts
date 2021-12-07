import { Program } from '../../program/entities/program.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Session } from '../../session/entities/session.entity'

@Entity()
export class Workout extends Base {
  @Column()
  title: string

  @ManyToOne(() => Program, (program) => program.workouts)
  program?: Program

  @OneToMany(() => Exercise, (exercise) => exercise.workout, { eager: true })
  exercises?: Exercise[]

  @OneToMany(() => Session, (session) => session.workout)
  sessions?: Session[]

  @Column({
    type: 'set',
    enum: WeekDays,
    default: [],
  })
  scheduledDays?: WeekDays[]

  constructor(partial: Partial<Workout> = {}) {
    super()
    Object.assign(this, partial)
  }
}
