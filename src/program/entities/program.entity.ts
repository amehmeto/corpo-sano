import { Column, Entity, OneToMany } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'
import { Base } from '../../__infrastructure__/typeorm/base.entity'

@Entity()
export class Program extends Base {
  @Column()
  title: string

  @OneToMany(() => Workout, (workout) => workout.program, { eager: true })
  workouts: Workout[]

  constructor(partial: Partial<Program> = {}) {
    super()
    Object.assign(this, partial)
  }
}
