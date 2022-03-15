import { Program } from '../entities/program.entity'
import { ProgramGateway } from '../gateways/program.gateway.interface'

export class GetProgramUsecase {
  constructor(private readonly programGateway: ProgramGateway) {}

  async execute(programId: string): Promise<Program | undefined> {
    return this.programGateway.findById(programId)
  }
}
