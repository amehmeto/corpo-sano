import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  constructor(partial: Partial<Program> | undefined = {}) {
      Object.assign(this, partial)
  }
}
