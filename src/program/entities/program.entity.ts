import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'
import { Base } from '../../__infrastructure__/typeorm/base.entity'
import { Athlete } from '../../athlete/entities/athlete.entity'

@Entity()
export class Program extends Base {
  @Column()
  title: string

  @OneToMany(() => Workout, (workout) => workout.program, { eager: true })
  workouts: Workout[]

  @ManyToOne(() => Athlete, (athlete) => athlete.programs)
  athlete: Athlete

  constructor(partial: Partial<Program> = {}) {
    super()
    Object.assign(this, partial)
  }
}
