import * as Faker from 'faker'
import { exerciseDataBuilder } from './exercise.data-builder'
import { Exercise } from '../../src/exercise/entities/exercise.entity'

export function workoutDataBuilder(workout = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Bas du corps',
    exercises: [
      new Exercise(
        exerciseDataBuilder({
          rankInWorkout: 0,
        }),
      ),
      new Exercise(
        exerciseDataBuilder({
          rankInWorkout: 1,
        }),
      ),
      new Exercise(
        exerciseDataBuilder({
          rankInWorkout: 2,
        }),
      ),
      new Exercise(
        exerciseDataBuilder({
          rankInWorkout: 3,
        }),
      ),
    ],
  }
  return { ...template, ...workout }
}
