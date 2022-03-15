import { WorkoutGateway } from '../gateways/workout.gateway.interface'
import { Workout } from '../entities/workout.entity'

export class UpdateWorkoutUseCase {
  constructor(private readonly workoutGateway: WorkoutGateway) {}

  async execute(workoutId: string, workout: Workout): Promise<void> {
    await this.workoutGateway.update(workoutId, workout)
  }
}
