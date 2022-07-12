import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { selectWantedExercise } from './select-exercise.handler'

describe('Select Exercise', () => {
  // TODO: fix the shallow copy array issue and unskip it
  it.skip('should select exercise', async () => {
    const exercises = [
      exerciseDataBuilder(),
      exerciseDataBuilder(),
    ]
    const expectedExercises = Object.assign([], exercises)
    expectedExercises[0].isSelected = true

    const selectedExercises = selectWantedExercise(exercises, 0)

    expect(expectedExercises).toStrictEqual(selectedExercises)
  })
})
