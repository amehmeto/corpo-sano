import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { DailyTask } from '../../daily-task/entities/daily-task.entity'
import { Program } from '../../program/entities/program.entity'

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
  dailyTasks: DailyTask[]

  @OneToMany(() => Program, (program) => program.athlete, { nullable: true })
  @JoinColumn()
  programs?: Program[]

  constructor(partial: Partial<Athlete> = {}) {
    super()
    Object.assign(this, partial)
  }
}
