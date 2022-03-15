import { Program } from '../entities/program.entity'
import { ProgramGateway } from '../gateways/program.gateway.interface'

export type ProgramInput = {
  title: string
  description: string
}

export class CreateProgramUseCase {
  constructor(private readonly programGateway: ProgramGateway) {}

  async execute(programInput: ProgramInput): Promise<Program> {
    return this.programGateway.create(programInput)
  }
}
