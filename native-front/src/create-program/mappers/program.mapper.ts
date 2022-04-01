import { Program } from '../entities/program.entity'
import { WorkoutMapper } from './workout.mapper'

export class ProgramMapper {
  static mapToDomain(rawProgram: any) {
    return new Program(
      rawProgram.id,
      rawProgram.title,
      // TODO: Program description and workouts should come from back-end.
      // rawProgram.description,
      // rawProgram.workouts.map((workout: any) =>
      //   WorkoutMapper.mapToDomain(workout),
      // ),
    )
  }
}
