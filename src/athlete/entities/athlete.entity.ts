import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { DailyTask } from '../../daily-task/entities/daily-task.entity'

@Entity()
export class Athlete extends Base {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToOne(() => Biometrics)
  @JoinColumn()
  biometrics: Biometrics

  @OneToOne(() => DailyTask, { nullable: true })
  @JoinColumn()
  dailyTask: DailyTask

  constructor(partial: Partial<Athlete> = {}) {
    super()
    Object.assign(this, partial)
  }
}
