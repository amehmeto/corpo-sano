import { Entity, ManyToOne } from 'typeorm'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Workout } from '../../workout/entities/workout.entity'

@Entity()
export class Session extends Base {
  @ManyToOne(() => Workout, (workout) => workout.sessions)
  workout?: Workout

  constructor(partial: Partial<Session> = {}) {
    super()
    Object.assign(this, partial)
  }
}
