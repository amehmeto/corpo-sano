import { LoginGateway } from './login.gateway.interface'
import { GraphqlLoginGateway } from './login.graphql.gateway'
import {
  createPipeLine,
  deletePipeLine,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'

describe('Login Gateway', () => {
  let loginGateway: LoginGateway

  beforeAll(async () => {
    await createPipeLine()
    loginGateway = new GraphqlLoginGateway()
  })

  beforeEach(async () => {await createPipeLine()
    await initializeIntegrationTestEnvironment()
  })

  afterAll(async () => {
    await deletePipeLine()
  })

  it('should return token', async () => {
    const payload = { email: 'Shaniya46@hotmail.com', password: 'qwerty' }
    const expectedToken = expect.any(String)

    const retrievedToken = await loginGateway.login(payload)

    expect(retrievedToken).toStrictEqual(expectedToken)
  })
})
