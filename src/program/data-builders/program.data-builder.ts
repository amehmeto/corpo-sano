import { Workout } from '../../workout/entities/workout.entity'
import * as Faker from 'faker'
import { Program } from '../entities/program.entity'

export function programDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Mon programme',
    workouts: [] as Workout[],
  }
  return { ...template, ...program }
}

export const programFixture = programDataBuilder()
export const programFixtures = [
  new Program(programDataBuilder()),
  new Program(programDataBuilder()),
]
