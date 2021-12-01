import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Biometrics } from '../../biometrics/models/biometrics.model'
import { DailyTask } from '../../daily-task/models/daily-task.model'
import { Program } from '../../program/models/program.model'

@ObjectType()
export class Athlete {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field()
  email: string

  @Field()
  password: string

  @Field(() => Biometrics)
  biometrics: Biometrics

  @Field(() => [DailyTask], { nullable: true })
  dailyTasks?: DailyTask[]

  @Field(() => [Program], { nullable: true })
  programs?: Program[]
}
