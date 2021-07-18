import { ProgramRepository } from '../interfaces/program-repository.interface'
import { WorkoutInput } from '../../workout/types/workout-input'
import { Workout } from '../../workout/entities/workout.entity'
import { Repository } from 'typeorm'
import { Program } from '../entities/program.entity'

/*export class TypeOrmProgramRepository
  extends Repository<Program>
  implements ProgramRepository
{
  create(workoutInput: WorkoutInput): Promise<Workout> {
    return Promise.resolve(undefined)
  }
}*/
