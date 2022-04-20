import { AthleteGateway } from './athlete.gateway.interface'
import { GraphQLAthleteGateway } from './athlete.graphql.gateway'
import { Athlete } from '../entities/athlete.entity'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { DailyTask } from '../entities/daily-task.entity'
import { HardCodedValuesEnum } from '../../tests/hard-coded-values.enum'

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
    const athleteId = HardCodedValuesEnum.athleteId
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
