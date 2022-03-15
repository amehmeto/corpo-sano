import { GraphQLGateway } from '../../_infrastructure/gateway/base.graphql.gateway'
import { AuthCredentialsInput, LoginGateway } from './login.gateway.interface'

export class GraphqlLoginGateway
  extends GraphQLGateway
  implements LoginGateway
{
  async login(payload: AuthCredentialsInput): Promise<string> {
    const signInQuery = {
      query: `query SignIn($payload: AuthCredentialsInput!) {
        signIn(payload: $payload) {
          token
        }
      }`,
      variables: {
        payload,
      },
    }

    return await this.request(signInQuery)
  }
}
