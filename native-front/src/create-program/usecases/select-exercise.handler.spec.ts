import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { selectWantedExercise } from './select-exercise.handler'

describe('Select Exercise', () => {
  it('should select exercise', async () => {
    const exercises = [
      exerciseDataBuilder(),
      exerciseDataBuilder(),
    ]

    const selectedExercises = selectWantedExercise(exercises, 0)

    const expectedExercises = exercises
    expectedExercises[0].isSelected = true

    expect(expectedExercises).toStrictEqual(selectedExercises)
  })
})