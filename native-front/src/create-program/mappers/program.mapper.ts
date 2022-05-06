import { Program } from '../entities/program.entity'
import { WorkoutMapper } from './workout.mapper'

export class ProgramMapper {
  static mapToDomain(rawProgram: any) {
    let workouts = []
    if (rawProgram.workouts){
      workouts = rawProgram.workouts.map((workout: any) =>
        WorkoutMapper.mapToDomain(workout),
      )
    }
    return new Program(
      rawProgram.id,
      rawProgram.title,
      //TODO: Program description should come from back-end.
      //rawProgram.description,
      workouts
    )
  }
}
