import { Workout } from '../../src/workout/entities/workout.entity'

export function programDataBuilder(program = {}) {
  const template = {
    title: 'Mon programme',
    workouts: [] as Workout[],
  }
  return { ...template, ...program }
}
