import { Workout } from 'src/workout/entities/workout.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string

  @OneToMany(type => Workout, workout => workout.program)
  workouts: Workout[]

  constructor(partial: Partial<Program> | undefined = {}) {
    Object.assign(this, partial)
  }
}
