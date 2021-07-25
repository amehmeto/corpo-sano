import { Program } from '../../program/entities/program.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Exercise } from '../../exercise/entities/exercise.entity'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @ManyToOne((type) => Program, (program) => program.workouts)
  program: Program

  exercises: Exercise[]

  constructor(partial: Partial<Workout> | undefined = {}) {
    Object.assign(this, partial)
  }
}
