import { WorkoutGateway } from '../gateways/workout.gateway.interface'
import { Workout } from '../entities/workout.entity'

export class GetWorkoutUseCase {
  constructor(private readonly workoutGateway: WorkoutGateway) {}

  async execute(workoutId: string): Promise<Workout> {
    return this.workoutGateway.findById(workoutId)
  }
}
