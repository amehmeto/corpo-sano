import { Column, Entity } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'

@Entity()
export class DailyTask extends Base {
  @Column()
  description: string

  constructor(partial: Partial<DailyTask> = {}) {
    super()
    Object.assign(this, partial)
  }
}
