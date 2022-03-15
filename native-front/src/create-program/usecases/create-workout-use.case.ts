import { ProgramGateway } from '../gateways/program.gateway.interface'
import { Workout } from '../entities/workout.entity'

export type WorkoutInput = {
  title: string
  description: string
  programId: string
}

export class CreateWorkoutUseCase {
  constructor(private readonly programGateway: ProgramGateway) {}

  async execute(
    programId: string,
    workoutInput: WorkoutInput,
  ): Promise<Workout> {
    return this.programGateway.addWorkout(programId, workoutInput)
  }
}
