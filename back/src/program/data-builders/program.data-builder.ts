import { Workout } from '../../workout/entities/workout.entity'
import { faker as Faker } from '@faker-js/faker'
import { Program } from '../entities/program.entity'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'

export function programDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Mon programme',
    workouts: [] as Workout[],
  }
  return { ...template, ...program }
}

export const programFixture = programDataBuilder({
  id: HardCodedValuesEnum.programId,
})

export const programFixtures = [
  new Program(programDataBuilder()),
  new Program(programDataBuilder()),
]
