import { Program } from '../../program/entities/program.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/entities/exercise.entity'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @ManyToOne(() => Program, (program) => program.workouts)
  program?: Program

  @OneToMany(() => Exercise, (exercise) => exercise.workout, {
    eager: true,
  })
  exercises?: Exercise[]

  @Column({
    type: 'set',
    enum: WeekDays,
    default: [],
  })
  scheduledDays?: WeekDays[]

  constructor(partial: Partial<Workout> = {}) {
    Object.assign(this, partial)
  }
}
