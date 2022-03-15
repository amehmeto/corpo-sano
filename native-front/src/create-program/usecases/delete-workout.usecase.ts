import { ProgramGateway } from '../gateways/program.gateway.interface'

export class DeleteWorkoutUseCase {
  constructor(private readonly programGateway: ProgramGateway) {}

  async execute(programId: string, workoutId: string) {
    return this.programGateway.deleteWorkout(programId, workoutId)
  }
}
