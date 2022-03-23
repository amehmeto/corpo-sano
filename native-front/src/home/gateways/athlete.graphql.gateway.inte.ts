import { AthleteGateway } from './athlete.gateway.interface'
import { GraphQLAthleteGateway } from './athlete.graphql.gateway'
import { Athlete } from '../entities/athlete.entity'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { DailyTask } from '../entities/daily-task.entity'

describe('Athlete Gateway', () => {
  let athleteGateway: AthleteGateway

  beforeAll(async () => {
    await createPipe()
    athleteGateway = new GraphQLAthleteGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  afterAll(async () => {
    await deletePipe()
  })

  it('should find an athlete by id', async () => {
    const athleteId = '93c87b16-9c92-4440-9ce3-658050ba8dd8'
    const expectedDailyTask = expect.any(DailyTask)
    const expectedMappedAthlete = expect.any(Athlete)

    const retrievedAthlete = await athleteGateway.findById(athleteId)

    expect(retrievedAthlete).toStrictEqual(expectedMappedAthlete)
    if (!retrievedAthlete.dailyTasks) throw Error("Array doesn't exit")
    retrievedAthlete.dailyTasks.forEach((task) => {
      expect(task).toStrictEqual(expectedDailyTask)
    })
  })
})
