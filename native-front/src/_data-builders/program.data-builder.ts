import { faker } from '@faker-js/faker'
import { workoutDataBuilder } from './workout.data-builder'
import { WeekDays } from './types/week-days.enum'
import { Workout } from '../create-program/entities/workout.entity'

export function programDataBuilder(program = {}) {
  const template = {
    id: faker.datatype.uuid(),
    title: '3 weeks Upper Chest',
    description: 'You gonna work very hard stupid fat boy',
    workouts: [
      workoutDataBuilder({
        scheduleDays: [WeekDays.MONDAY, WeekDays.FRIDAY],
      }),
      workoutDataBuilder({
        scheduleDays: [WeekDays.THURSDAY, WeekDays.SATURDAY],
      }),
      workoutDataBuilder({
        scheduleDays: [WeekDays.WEDNESDAY, WeekDays.SUNDAY, WeekDays.TUESDAY],
      }),
      workoutDataBuilder(),
    ] as Workout[],
  }
  return { ...template, ...program }
}
