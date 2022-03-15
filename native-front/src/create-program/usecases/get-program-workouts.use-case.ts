import { Workout } from '../entities/workout.entity'
import { ProgramGateway } from '../gateways/program.gateway.interface'

export class GetProgramWorkoutsUseCase {
  constructor(private programGateway: ProgramGateway) {}

  async execute(programId: string): Promise<Workout[]> {
    const program = await this.programGateway.findById(programId)
    if (!program) throw new Error('Program not found')
    return program.workouts
  }
}
