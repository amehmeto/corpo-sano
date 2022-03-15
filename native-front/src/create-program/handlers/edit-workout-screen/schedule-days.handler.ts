import { ScheduledDays, Workout } from '../../entities/workout.entity'

export function scheduleWantedDays(
  prevWorkout: Workout | undefined,
  dayIndex: number,
): Workout | undefined {
  if (!prevWorkout) return
  if (!prevWorkout?.scheduledDays) return prevWorkout

  const newScheduledDays = prevWorkout.scheduledDays.map((day, index) => {
    return index === dayIndex
      ? {
          ...day,
          isScheduled: !day.isScheduled,
        }
      : day
  })
  return {
    ...prevWorkout,
    scheduledDays: newScheduledDays as ScheduledDays,
  }
}
