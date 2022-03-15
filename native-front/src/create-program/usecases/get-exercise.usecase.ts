import { Exercise } from '../entities/exercise.entity'
import { ExerciseGateway } from '../gateways/exercise.gateway.interface'

export class GetExerciseUseCase {
  constructor(private exerciseGateway: ExerciseGateway) {}

  async execute(exerciseId: string): Promise<Exercise | undefined> {
    try {
      console.log('Call gateway from Exercise Gateway')
      const temp = await this.exerciseGateway.findById(
        'ef87e63a-0bbc-45d4-8612-6dfa366f00ea',
      )
      console.log(temp)
      return temp
    } catch (e) {
      console.error(e)
    }
  }
}
