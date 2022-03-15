import { ScheduledDay } from '../../entities/workout.entity'

export function formatForButton(day: ScheduledDay) {
  return `${day.name.charAt(0).toUpperCase()}${day.name.slice(1, 3)}`
}
