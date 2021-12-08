import { Entity, ManyToOne } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Session } from '../../session/entities/session.entity'

@Entity()
export class Performance extends Base {
  @ManyToOne(() => Session, (session) => session.performances)
  session: Session

  constructor(partial: Partial<Performance> = {}) {
    super()
    Object.assign(this, partial)
  }
}
