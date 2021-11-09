import { Workout } from '../../src/workout/entities/workout.entity'
import * as Faker from 'faker'

export function programDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Mon programme',
    workouts: [] as Workout[],
  }
  return { ...template, ...program }
}
