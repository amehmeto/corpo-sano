import { Program } from 'src/program/entities/program.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string

  @ManyToOne(type => Program, program => program.workouts)
  program: Program

  constructor(partial: Partial<Workout> | undefined = {}) {
    Object.assign(this, partial)
  }
}
