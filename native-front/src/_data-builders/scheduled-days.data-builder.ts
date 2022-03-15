import { ScheduledDays } from '../create-program/entities/workout.entity'

export function scheduledDaysDataBuilder(): ScheduledDays {
  return [
    { name: 'monday', isScheduled: false },
    { name: 'tuesday', isScheduled: false },
    { name: 'wednesday', isScheduled: false },
    { name: 'thursday', isScheduled: false },
    { name: 'friday', isScheduled: false },
    { name: 'saturday', isScheduled: false },
    { name: 'sunday', isScheduled: false },
  ]
}
