import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Program } from 'src/program/entities/program.entity'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutInput } from './types/workout-input'

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    private readonly programRepository: ProgramRepository,
  ) {}

  create(workoutInput: WorkoutInput): Promise<Workout> {

    const workout = new Workout({
      title: workoutInput.title,
      programId: workoutInput.programId,
    })

    return this.workoutRepository.save(workout)
  }
}
