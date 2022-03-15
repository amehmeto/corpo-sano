import { Program } from '../entities/program.entity'

export class ProgramMapper {
  static mapToDomain(rawProgram: any) {
    return new Program(
      rawProgram.id,
      rawProgram.title,
      rawProgram.description,
      rawProgram.workouts,
    )
  }
}
