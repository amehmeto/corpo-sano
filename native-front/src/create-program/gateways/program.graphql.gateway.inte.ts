import { ProgramGateway } from './program.gateway.interface'
import { Program } from '../entities/program.entity'
import { GraphQLProgramGateway } from './program.graphql.gateway'
import { initializeTokenCheatCode } from '../../_infrastructure/dependency-injection.container'
import { Workout } from '../entities/workout.entity'
import { initializeIntegrationTestEnvironment } from '../../tests/initializeIntegrationTestEnvironment'

describe('Program Gateway', () => {
  jest.setTimeout(10000)
  let programGateway: ProgramGateway

  beforeAll(async () => {
    await initializeTokenCheatCode()
    programGateway = new GraphQLProgramGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  it('should create a program', async () => {
    const programInput = { title: '3 weeks body', description: 'Less Fat' }
    const expectedProgram = expect.any(Program)

    const createdProgram = await programGateway.create(programInput)

    expect(createdProgram).toStrictEqual(expectedProgram)
  })

  it('should add a workout', async () => {
    const programId = '23c8b6ce-9b10-465c-a581-44ca59d2c3ac'
    const workoutInput = {
      title: 'Push Workout',
      description: '...',
      programId: '23c8b6ce-9b10-465c-a581-44ca59d2c3ac',
    }
    const expectedWorkout = expect.any(Workout)

    const addedWorkout = await programGateway.addWorkout(
      programId,
      workoutInput,
    )

    expect(addedWorkout).toStrictEqual(expectedWorkout)
  })
})
