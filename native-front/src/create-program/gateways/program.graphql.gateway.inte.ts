import { ProgramGateway } from './program.gateway.interface'
import { Program } from '../entities/program.entity'
import { GraphQLProgramGateway } from './program.graphql.gateway'
import { Workout } from '../entities/workout.entity'
import {
  createPipe,
  deletePipe,
  initializeIntegrationTestEnvironment,
} from '../../tests/initializeIntegrationTestEnvironment'
import { HardCodedValuesEnum } from '../../tests/hard-coded-values.enum'

describe('Program Gateway', () => {
  let programGateway: ProgramGateway

  beforeAll(async () => {
    await createPipe()
    programGateway = new GraphQLProgramGateway()
  })

  beforeEach(async () => {
    await initializeIntegrationTestEnvironment()
  })

  afterAll(async () => {
    await deletePipe()
  })

  it('should create a program', async () => {
    const programInput = { title: '3 weeks body', description: 'Less Fat' }
    const expectedProgram = expect.any(Program)

    const createdProgram = await programGateway.create(programInput)

    expect(createdProgram).toStrictEqual(expectedProgram)
  })

  it('should add a workout', async () => {
    const programId = HardCodedValuesEnum.programId
    const workoutInput = {
      title: 'Push Workout',
      description: '...',
      programId: HardCodedValuesEnum.programId,
    }
    const expectedWorkout = expect.any(Workout)

    const addedWorkout = await programGateway.addWorkout(
      programId,
      workoutInput,
    )

    expect(addedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should get all programs', async () => {
    const expectedPrograms = expect.arrayContaining([])

    const retrievedPrograms = await programGateway.find()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })


  it('should get program by id', async () => {
    const programId = HardCodedValuesEnum.programId
    const expectedPrograms = expect.arrayContaining([])

    const retrievedPrograms = await programGateway.findById(programId)

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
