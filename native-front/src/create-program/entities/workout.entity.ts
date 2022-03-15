import { Exercise } from './exercise.entity'

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type ScheduledDay = { name: WeekDay; isScheduled: boolean }

export type ScheduledDays = [
  ScheduledDay,
  ScheduledDay,
  ScheduledDay,
  ScheduledDay,
  ScheduledDay,
  ScheduledDay,
  ScheduledDay,
]

export class Workout {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly programId: string,
    public readonly exercises: Exercise[],
    public readonly scheduledDays: ScheduledDays,
  ) {
    if (!this.exercises) this.exercises = []
  }
}
