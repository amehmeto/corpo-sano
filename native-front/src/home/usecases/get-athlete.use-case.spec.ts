import { GetAthleteUseCase } from './get-athlete.use-case'
import { AthleteGateway } from '../gateways/athlete.gateway.interface'
import { InMemoryAthleteGateway } from '../gateways/athlete.in-memory.gateway'

describe('Get Athlete Use Case', () => {
  let getAthleteUseCase: GetAthleteUseCase
  let athleteGateway: AthleteGateway

  beforeEach(() => {
    athleteGateway = new InMemoryAthleteGateway()
    getAthleteUseCase = new GetAthleteUseCase(athleteGateway)
  })

  it('should return an athlete', async () => {
    const [athlete] = await athleteGateway.findAll()
    const expectedAthlete = athlete

    const retrievedAthlete = await getAthleteUseCase.execute(athlete.id)

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })
})
