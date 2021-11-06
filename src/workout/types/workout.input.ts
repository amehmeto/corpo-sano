import { Field, ID, InputType } from '@nestjs/graphql'
import { WeekDays } from './week-days.enum'
import { Exercise } from '../../exercise/models/exercise.model'

@InputType()
export class WorkoutInput {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [Exercise])
  exercises?: Exercise[]

  @Field(() => [String])
  scheduledDays?: WeekDays[]
}
