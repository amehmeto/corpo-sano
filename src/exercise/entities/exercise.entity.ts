import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ExerciseTemplate } from './exercise-template.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { Base } from '../../__infrastructure__/typeorm/base.entity'

@Entity()
export class Exercise extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(
    () => ExerciseTemplate,
    (exerciseTemplate) => exerciseTemplate.exercises,
    {
      eager: true,
    },
  )
  template: ExerciseTemplate

  @Column({ default: 0 })
  numberOfSets: number

  @Column({ default: 0 })
  numberOfReps: number

  @Column({ default: 0 })
  interSetsRestTime: number

  @Column({ default: 0 })
  finalRestTime: number

  @ManyToOne(() => Workout, (workout) => workout.exercises)
  workout: Workout

  @CreateDateColumn()
  createAt: Date

  constructor(partial: Partial<Exercise> = {}) {
    super()
    Object.assign(this, partial)
  }
}
