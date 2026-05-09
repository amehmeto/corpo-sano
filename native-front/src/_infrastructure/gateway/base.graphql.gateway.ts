import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  getDataKey,
  handleGraphQLResponse,
  Query,
} from './handle-graphql-response'
import * as env from 'env-var'

export class GraphQLGateway {
<<<<<<< Updated upstream
  protected readonly port = env.get('PORT').default('3005').asPortNumber()
  protected readonly backendApiDomain = env
    .get('URL')
    .default('localhost')
    .asString()
  protected readonly gatewayUrl = `http://${this.backendApiDomain}:${this.port}/graphql`
=======
  protected readonly port = env.get('PORT').default('5432').asPortNumber()
  // TODO: utiliser les variables d'environnements dès que possible. Issue Jest ouverte, bloqué pour l'instant
  protected readonly backendApi = 'localhost'
  // protected readonly backendApi = '51.159.164.130'
  protected readonly gatewayUrl = `http://${this.backendApi}:${this.port}/graphql`
>>>>>>> Stashed changes

  protected async request(queryPayload: Query): Promise<any> {
    const token = await AsyncStorage.getItem('token')
    const answer = await axios.post(this.gatewayUrl, queryPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const dataKey = getDataKey(queryPayload)

    return handleGraphQLResponse(answer.data, dataKey)
  }

  protected handleError(e: unknown) {
    throw new Error(`No response from the server: ${e}`)
  }
}
