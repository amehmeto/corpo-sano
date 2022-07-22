import * as _ from 'lodash'
import { exerciseDataBuilder } from '../../_data-builders/exercise.data-builder'
import { selectWantedExercise } from './select-exercise.handler'

describe('Select Exercise', () => {
  it('should select exercise', async () => {
    const exercises = [exerciseDataBuilder(), exerciseDataBuilder()]
    const expectedExercises = _.cloneDeep(exercises)
    expectedExercises[0].isSelected = true

    const selectedExercises = selectWantedExercise(exercises, 0)

    expect(expectedExercises).toStrictEqual(selectedExercises)
  })
})
