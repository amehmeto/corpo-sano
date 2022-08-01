import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  getDataKey,
  handleGraphQLResponse,
  Query,
} from './handle-graphql-response'
import * as env from 'env-var'

export class GraphQLGateway {
  protected readonly port = env.get('PORT').default('3005').asPortNumber()
  protected readonly backendApiDomain = env.get('URL').default('localhost').asString()
  protected readonly gatewayUrl = `http://${this.backendApiDomain}:${this.port}/graphql`

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
