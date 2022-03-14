import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ExerciseTemplate } from './exercise-template.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity'
import { Performance } from '../../performance/entities/performance.entity'

@Entity()
export class Exercise extends BaseEntity {
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

  @Column()
  position: number

  @ManyToOne(() => Workout, (workout) => workout.exercises)
  workout: Workout

  @OneToMany(() => Performance, (performance) => performance.exercise)
  performances: Performance[]

  constructor(partial: Partial<Exercise> = {}) {
    super()
    Object.assign(this, partial)
  }
}
