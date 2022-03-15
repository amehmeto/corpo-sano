import { Program } from '../entities/program.entity'
import { ProgramInput } from '../usecases/create-program-use.case'
import { WorkoutInput } from '../usecases/create-workout-use.case'
import { Workout } from '../entities/workout.entity'

export interface ProgramGateway {
  create(programInput: ProgramInput): Promise<Program>
  find(): Promise<Program[]>
  findById(programId: string): Promise<Program | undefined>
  addWorkout(programId: string, workoutInput: WorkoutInput): Promise<Workout>
  deleteWorkout(programId: string, workoutId: string): Promise<boolean>
}
