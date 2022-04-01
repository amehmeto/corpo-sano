import { Workout } from '../entities/workout.entity'
import { GraphQLWorkoutGateway } from './workout.graphql.gateway'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { HardCodedValuesEnum } from '../../tests/hard-coded-values.enum'

describe('Workout Gateway', () => {
  let workoutGateway: GraphQLWorkoutGateway

  beforeAll(async () => {
    await createPipe()
    workoutGateway = new GraphQLWorkoutGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  afterAll(async () => {
    await deletePipe()
  })

  it('should get workout with id', async () => {
    const workoutId = HardCodedValuesEnum.workoutId
    const expectedWorkout = expect.any(Workout)

    const retrievedWorkout = await workoutGateway.findById(workoutId)

    expect(retrievedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should update workout', async () => {
    const workoutId = HardCodedValuesEnum.workoutId
    const workout = expect.any(Workout)
    const expectedWorkout = expect.any(Boolean)

    const retrievedWorkout = await workoutGateway.update(workoutId, workout)

    expect(retrievedWorkout).toStrictEqual(expectedWorkout)
  })
})
