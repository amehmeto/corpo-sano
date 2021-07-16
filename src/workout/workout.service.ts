import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  create(title: string): Promise<Workout> {
    const workout = new Workout({
      title,
    })

    return this.workoutRepository.save(workout)
  }
}
