import { Program } from '../../program/entities/program.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ExerciseTemplate } from '../../exercise-template/entities/exercise-template.entity'
import { WeekDays } from '../types/week-days.enum'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @ManyToOne(() => Program, (program) => program.workouts)
  program?: Program

  @ManyToMany(() => ExerciseTemplate, (exercise) => exercise.workouts, {
    eager: true,
  })
  @JoinTable()
  exercises?: ExerciseTemplate[]

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
