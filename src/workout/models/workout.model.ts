import { Field, ObjectType } from '@nestjs/graphql'
import { WeekDays } from '../types/week-days.enum'
import { Exercise } from '../../exercise/models/exercise.model'
import { Session } from '../../session/models/session.model'
import { Program } from '../../program/models/program.model'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'

@ObjectType()
export class Workout extends BaseModel {
  @Field()
  title: string

  @Field(() => Program)
  program?: Program

  @Field(() => [Exercise])
  exercises?: Exercise[]

  @Field(() => [Session])
  sessions?: Session[]

  @Field(() => [String])
  scheduledDays?: WeekDays[]
}
