import { Program } from '../../program/entities/program.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @ManyToOne((type) => Program, (program) => program.workouts)
  program: Program

  constructor(partial: Partial<Workout> | undefined = {}) {
    Object.assign(this, partial)
  }
}
