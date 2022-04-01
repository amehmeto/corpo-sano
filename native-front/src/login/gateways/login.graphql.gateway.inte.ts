import { LoginGateway } from './login.gateway.interface'
import { GraphqlLoginGateway } from './login.graphql.gateway'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { HardCodedValuesEnum } from '../../tests/hard-coded-values.enum'

describe('Login Gateway', () => {
  let loginGateway: LoginGateway

  beforeAll(async () => {
    await createPipe()
    loginGateway = new GraphqlLoginGateway()
  })

  beforeEach(async () => {await createPipe()
    await initializeIntegrationTestEnvironment()
  })

  afterAll(async () => {
    await deletePipe()
  })

  it('should return token', async () => {
    const payload = { email: HardCodedValuesEnum.athleteEmail, password: HardCodedValuesEnum.athletepassword }
    const expectedToken = expect.any(String)

    const retrievedToken = await loginGateway.login(payload)

    expect(retrievedToken).toStrictEqual(expectedToken)
  })
})
