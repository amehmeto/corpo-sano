import { ExerciseGateway } from '../gateways/exercise.gateway.interface'

export class DeleteExerciseUseCase {
  constructor(private readonly exerciseGateway: ExerciseGateway) {}

  execute(exerciseId: string): Promise<boolean> {
    return Promise.resolve(this.exerciseGateway.deleteExercise(exerciseId))
  }
}
