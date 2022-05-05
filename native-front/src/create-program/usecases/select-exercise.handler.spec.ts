import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { selectWantedExercise } from './select-exercise.handler'

describe('Select Exercise', () => {
  it('should select exercise', async () => {
    const exercises = [
      exerciseDataBuilder(),
      exerciseDataBuilder(),
    ]

    const expectedExercises = [
      exerciseDataBuilder({ ...exercises[0], isSelected: true }),
      exerciseDataBuilder(exercises[1]),
    ]

    const selectedExercises = selectWantedExercise(exercises, 0)

    expect(selectedExercises).toStrictEqual(expectedExercises)
  })
})