import { ExerciseGateway } from './exercise.gateway.interface'
import { Exercise } from '../entities/exercise.entity'
import { GraphQLGateway } from '../../_infrastructure/gateway/base.graphql.gateway'

class ExerciseMapper {
  static mapToDomain(rawExercise: any) {
    return new Exercise(
      rawExercise.id,
      rawExercise.template,
      rawExercise.numberOfSets,
      rawExercise.numberOfReps,
      rawExercise.interSetsRestTime,
      rawExercise.finalRestTime,
    )
  }
}

export class ExerciseGraphqlGateway
  extends GraphQLGateway
  implements ExerciseGateway
{
  async deleteExercise(exerciseId: string): Promise<boolean> {
    try {
      const deleteExerciseQuery = `mutation DeleteExercise($exerciseId: ID!) {
      deleteExercise(exerciseId: $exerciseId)
    }`

      const deleteExerciseMutationPayload = {
        query: deleteExerciseQuery,
        variables: {
          exerciseId: exerciseId,
        },
      }

      return await this.request(deleteExerciseMutationPayload)
    } catch (error) {
      return Promise.resolve(false)
    }
  }

  async findById(exerciseId: string): Promise<Exercise | undefined> {
    const getExerciseQuery = {
      query: `query GetExercise($exerciseId: ID!) {
        getExercise(exerciseId: $exerciseId) {
          id
          workout {
            id
          }
          template {
            id
            title
          }
          numberOfSets
        }
      }`,
      variables: {
        exerciseId,
      },
    }

    const getExercise = await this.request(getExerciseQuery)
    return ExerciseMapper.mapToDomain(getExercise)
  }
}
