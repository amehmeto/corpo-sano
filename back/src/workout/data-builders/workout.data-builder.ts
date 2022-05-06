import { faker as Faker } from '@faker-js/faker'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'
import { programFixture } from '../../program/data-builders/program.data-builder'

export function workoutDataBuilder(workout = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Bas du corps',
  }
  return { ...template, ...workout }
}

export const workoutFixture = workoutDataBuilder({
  id: HardCodedValuesEnum.workoutId,
  title: 'Leg Workout',
  programId: programFixture.id
})
