import { ExerciseTemplate } from './exercise-template.entity'

export type PrintableTime = {
  minutes: number
  seconds: string
}

export class Exercise {
  constructor(
    public readonly id: string,
    public readonly template: ExerciseTemplate,
    public readonly numberOfSets: number,
    public readonly numberOfReps: number,
    public readonly interSetsRestTime: PrintableTime,
    public readonly finalRestTime: PrintableTime,
  ) {}
}
