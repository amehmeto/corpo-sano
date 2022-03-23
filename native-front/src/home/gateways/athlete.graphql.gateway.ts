import { AthleteGateway } from './athlete.gateway.interface'
import { Athlete } from '../entities/athlete.entity'
import { GraphQLGateway } from '../../_infrastructure/gateway/base.graphql.gateway'
import { AthleteMapper } from '../mappers/athlete.mapper'

export class GraphQLAthleteGateway
  extends GraphQLGateway
  implements AthleteGateway
{
  findAll(): Promise<any[]> {
    throw new Error('Method not implemented.')
  }

  async findById(athleteId: string): Promise<Athlete> {
    try {
      const getAthleteQueryPayload = {
        query: `query GetAthlete($athleteId: ID!){
        getAthlete(athleteId: $athleteId) {
          id
          name
          email
          password
          biometrics {
            id
            height
            bodyFat
            lengthUnit
            weight
            weightUnit
            gender
            birthday
            weightGoal
          }
          dailyTasks {
            description
          }
        }
      }`,
        variables: {
          athleteId,
        },
      }

      const getAthlete = await this.request(getAthleteQueryPayload)
      return AthleteMapper.mapToDomain(getAthlete)
    } catch (e) {
      throw this.handleError(e)
    }
  }
}
