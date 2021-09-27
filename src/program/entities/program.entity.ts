import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Workout } from '../../workout/entities/workout.entity'

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => Workout, (workout) => workout.program, { eager: true })
  workouts: Workout[]

  constructor(partial: Partial<Program> = {}) {
    Object.assign(this, partial)
  }
}
