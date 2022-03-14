import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity'
import { Session } from '../../session/entities/session.entity'
import { Exercise } from '../../exercise/entities/exercise.entity'

@Entity()
export class Performance extends BaseEntity {
  @ManyToOne(() => Session, (session) => session.performances)
  session: Session

  @Column('simple-array')
  sets: number[]

  @ManyToOne(() => Exercise, (exercise) => exercise.performances, {
    eager: true,
  })
  exercise: Exercise

  constructor(partial: Partial<Performance> = {}) {
    super()
    Object.assign(this, partial)
  }
}
