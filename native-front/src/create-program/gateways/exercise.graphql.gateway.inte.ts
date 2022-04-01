import { GraphQLExerciseGateway } from './exercise.graphql.gateway'
import { Exercise } from '../entities/exercise.entity'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { HardCodedValuesEnum } from '../../tests/hard-coded-values.enum'

describe('Exercise Gateway', () => {
  let exerciseGateway: GraphQLExerciseGateway

  beforeAll(async () => {
    await createPipe()
    exerciseGateway = new GraphQLExerciseGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  afterAll(() => {
    deletePipe()
  })

  it('should delete exercise', async () => {
    const exerciseId = HardCodedValuesEnum.exerciseId

    const retrievedResult = await exerciseGateway.deleteExercise(exerciseId)

    expect(retrievedResult).toBeTruthy()
  })

  it('should get exercise with id', async () => {
    const exerciseId = HardCodedValuesEnum.exerciseId
    const expectedExercise = expect.any(Exercise)

    const retrievedExercise = await exerciseGateway.findById(exerciseId)

    expect(retrievedExercise).toStrictEqual(expectedExercise)
  })
})
