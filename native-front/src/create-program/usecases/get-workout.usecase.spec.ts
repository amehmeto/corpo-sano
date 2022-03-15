import { GetWorkoutUseCase } from './get-workout.usecase'
import { InMemoryWorkoutGatewayStub } from '../gateways/workout.in-memory-stub.gateway'
import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'

describe('Get Workout Use Case', () => {
  let workoutGateway: InMemoryWorkoutGatewayStub
  let getWorkoutUseCase: GetWorkoutUseCase

  beforeAll(() => {
    workoutGateway = new InMemoryWorkoutGatewayStub()
    getWorkoutUseCase = new GetWorkoutUseCase(workoutGateway)
  })

  it('should get the workout', async () => {
    const [workout] = await workoutGateway.find()
    const expectedWorkout = workout

    const retrievedWorkout = await getWorkoutUseCase.execute(workout.id)

    expect(retrievedWorkout).toStrictEqual(expectedWorkout)
  })

  it('should format the time 120 seconds into 2 min 00', async () => {
    const workout = await workoutGateway.create({
      title: 'Leg day',
      description: 'never skip the leg day',
      programId: 'program-id',
      exercises: [
        exerciseDataBuilder({ interSetsRestTime: 120, finalRestTime: 230 }),
      ],
    })

    const retrievedWorkout = await getWorkoutUseCase.execute(workout.id)
    const { interSetsRestTime, finalRestTime } = retrievedWorkout.exercises[0]

    expect(interSetsRestTime).toStrictEqual({ minutes: 2, seconds: '00' })
    expect(finalRestTime).toStrictEqual({ minutes: 3, seconds: '50' })
  })
})
