import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  constructor(partial: Partial<Exercise> | undefined = {}) {
    Object.assign(this, partial)
  }
}
