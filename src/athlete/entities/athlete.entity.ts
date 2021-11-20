import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'

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

  constructor(partial: Partial<Athlete> = {}) {
    super()
    Object.assign(this, partial)
  }
}
