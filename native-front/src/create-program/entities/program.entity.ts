import { Workout } from './workout.entity'

export class Program {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly workouts: Workout[],
  ) {
    if (!workouts) this.workouts = [] as Workout[]
  }
}
