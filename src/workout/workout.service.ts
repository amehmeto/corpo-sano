import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutInput } from './types/workout-input'
import { Program } from '../program/entities/program.entity'
import { v4 as uuid } from 'uuid'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async create(workoutInput: WorkoutInput): Promise<Workout> {
    const workout = new Workout({
      id: uuid(),
      title: workoutInput.title,
    })

    return this.workoutRepository.save(workout)
  }
}
