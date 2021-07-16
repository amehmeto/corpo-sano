import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string

  constructor(partial: Partial<Workout> | undefined = {}) {
    Object.assign(this, partial)
  }
}
