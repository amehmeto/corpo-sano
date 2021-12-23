import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity'
import { Session } from '../../session/entities/session.entity'

@Entity()
export class Performance extends BaseEntity {
  @ManyToOne(() => Session, (session) => session.performances)
  session: Session

  @Column('simple-array')
  sets: number[]

  constructor(partial: Partial<Performance> = {}) {
    super()
    Object.assign(this, partial)
  }
}
