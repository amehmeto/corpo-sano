import {
  ScheduledDay,
  ScheduledDays,
  Workout,
} from '../entities/workout.entity'
import { Exercise, PrintableTime } from '../entities/exercise.entity'

export enum ScheduledDayGqlInput {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export class WorkoutMapper {
  public static mapToDomain(rawWorkout: any): Workout {
    const mappedExercises = !rawWorkout.exercises
      ? []
      : rawWorkout.exercises.map((rawExercise: any) => {
          const interSetsRestTime = this.computeMinutesAndSeconds(
            rawExercise.interSetsRestTime,
          )
          const finalRestTime = this.computeMinutesAndSeconds(
            rawExercise.finalRestTime,
          )
          return new Exercise(
            rawExercise.id,
            rawExercise.template,
            rawExercise.numberOfSets,
            rawExercise.numberOfReps,
            interSetsRestTime,
            finalRestTime,
          )
        })
    const mappedScheduledDays = this.generateDomainScheduledDays(
      rawWorkout.scheduledDays,
    )
    return new Workout(
      rawWorkout.id,
      rawWorkout.title,
      rawWorkout.description,
      rawWorkout.programId,
      mappedExercises,
      mappedScheduledDays,
    )
  }

  private static computeMinutesAndSeconds(
    rawTimeInSeconds: number,
  ): PrintableTime {
    const minutes = Math.floor(rawTimeInSeconds / 60)
    const secondsLeft = rawTimeInSeconds % 60
    const printableSeconds =
      secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft.toString()
    return { minutes, seconds: printableSeconds }
  }

  private static generateDomainScheduledDays(
    scheduledDays: ScheduledDayGqlInput[],
  ): ScheduledDays {
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
}
