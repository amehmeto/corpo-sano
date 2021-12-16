import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { Performance } from '../../performance/entities/performance.entity'

@Entity()
export class Session extends Base {
  @ManyToOne(() => Workout, (workout) => workout.sessions)
  workout?: Workout

  @OneToMany(() => Performance, (performance) => performance.session, {
    eager: true,
  })
  performances: Performance[]

  constructor(partial: Partial<Session> = {}) {
    super()
    Object.assign(this, partial)
  }
}
