import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Exercise } from '../../exercise/models/exercise.model'
import { WeekDays } from '../types/week-days.enum'

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => [Exercise])
  exercises?: Exercise[]

  @Field(() => [String])
  scheduledDays?: WeekDays[]
}
