import { Workout } from '../../workout/entities/workout.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ExerciseTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts?: Workout[]

  constructor(partial: Partial<ExerciseTemplate> | undefined = {}) {
    Object.assign(this, partial)
  }
}
