import { ProgramGateway } from './program.gateway.interface'
import { Program } from '../entities/program.entity'
import { programDataBuilder } from '../../_data-builders/program.data-builder'
import { v4 as uuid } from 'uuid'
import { WorkoutInput } from '../usecases/create-workout-use.case'
import { Workout } from '../entities/workout.entity'
import { ProgramInput } from '../usecases/create-program-use.case'
import { WorkoutMapper } from '../mappers/workout.mapper'
import { scheduledDaysDataBuilder } from '../../_data-builders/scheduled-days.data-builder'

export class InMemoryProgramGateway implements ProgramGateway {
  private rawPrograms = [programDataBuilder()]
  private programs = this.rawPrograms.map(
    (rawProgram) =>
      new Program(
        rawProgram.id,
        rawProgram.title,
        rawProgram.description,
        rawProgram.workouts.map((workout) =>
          WorkoutMapper.mapToDomain(workout),
        ),
      ),
  )

  create(programInput: ProgramInput): Promise<Program> {
    const newId = uuid()
    this.programs.push(
      new Program(
        newId,
        programInput.title,
        programInput.description,
        [] as Workout[],
      ),
    )

    const createdProgram = this.programs.find((program) => program.id === newId)
    if (!createdProgram) throw new Error('Program not created')
    return Promise.resolve(createdProgram)
  }

  find(): Promise<Program[]> {
    console.log(this.programs[0].workouts)
    return Promise.resolve(this.programs)
  }

  findById(programId: string): Promise<Program | undefined> {
    const program = this.programs.find((_program) => _program.id === programId)
    return Promise.resolve(program)
  }

  async addWorkout(
    programId: string,
    workoutInput: WorkoutInput,
  ): Promise<Workout> {
    const program = await this.findById(programId)

    if (!program) throw new Error('Program not found')
    program.workouts.push(
      new Workout(
        uuid(),
        workoutInput.title,
        workoutInput.description,
        workoutInput.programId,
        [],
        scheduledDaysDataBuilder(),
      ),
    )
    return Promise.resolve(program.workouts[0])
  }

  deleteWorkout(programId: string, workoutId: string): Promise<boolean> {
    const programIndex = this.programs.findIndex(
      (_program) => _program.id === programId,
    )
    if (programIndex === -1) throw new Error('Program not found')
    const workoutIndex = this.programs[programIndex].workouts.findIndex(
      (_workout) => _workout.id === workoutId,
    )
    this.programs[programIndex].workouts.splice(workoutIndex, 1)
    return Promise.resolve(true)
  }
}
