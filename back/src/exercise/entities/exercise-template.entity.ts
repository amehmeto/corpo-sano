import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exercise } from './exercise.entity'

@Entity()
export class ExerciseTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => Exercise, (exercise) => exercise.template)
  exercises?: Exercise[]

  constructor(partial: Partial<ExerciseTemplate> = {}) {
    Object.assign(this, partial)
  }
}
