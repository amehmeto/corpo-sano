import { Exercise } from '../entities/exercise.entity'
import { ExerciseGateway } from '../gateways/exercise.gateway.interface'

export class GetExerciseUseCase {
  constructor(private exerciseGateway: ExerciseGateway) {}

  async execute(exerciseId: string): Promise<Exercise | undefined> {
    try {
      return await this.exerciseGateway.findById(exerciseId)
    } catch (e) {
      console.error(e)
    }
  }
}
