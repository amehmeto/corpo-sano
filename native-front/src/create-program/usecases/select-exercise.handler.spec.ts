import { InMemoryWorkoutGatewayStub } from '../gateways/workout.in-memory-stub.gateway'
import { GetWorkoutUseCase } from './get-workout.usecase'
import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { selectWantedExercise } from './select-exercise.handler'

describe('Select Exercise', () => {
  it('should select exercise', async () => {
    const exercisesData = [
      exerciseDataBuilder(),
      exerciseDataBuilder(),
    ]

    const expectedExercises = [
      exerciseDataBuilder({ ...exercisesData[0], isSelected: true }),
      exerciseDataBuilder(exercisesData[1]),
    ]

    const retrievedExercises = selectWantedExercise(exercisesData, 0)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })
})