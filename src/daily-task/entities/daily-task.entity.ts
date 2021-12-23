import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity'
import { Athlete } from '../../athlete/entities/athlete.entity'

@Entity()
export class DailyTask extends BaseEntity {
  @Column()
  description: string

  @ManyToOne(() => Athlete, (athlete) => athlete.dailyTasks, { nullable: true })
  athlete?: Athlete

  constructor(partial: Partial<DailyTask> = {}) {
    super()
    Object.assign(this, partial)
  }
}
