import { AthleteGateway } from './athlete.gateway.interface'
import { GraphQLAthleteGateway } from './athlete.graphql.gateway'
import { initializeTokenCheatCode } from '../../_infrastructure/dependency-injection.container'
import { Athlete } from '../entities/athlete.entity'
import { initializeIntegrationTestEnvironment } from '../../tests/initializeIntegrationTestEnvironment'

describe('Athlete Gateway', () => {
  jest.setTimeout(30000)
  let athleteGateway: AthleteGateway

  beforeAll(async () => {
    await initializeTokenCheatCode()
    athleteGateway = new GraphQLAthleteGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  it('should find an athlete by id', async () => {
    const athleteId = '93c87b16-9c92-4440-9ce3-658050ba8dd8'
    const expectedMappedAthlete = expect.any(Athlete)

    const retrievedAthlete = await athleteGateway.findById(athleteId)

    expect(retrievedAthlete).toStrictEqual(expectedMappedAthlete)
  })
})
