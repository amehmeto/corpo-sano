import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'
import { Athlete } from '../../athlete/models/athlete.model'

@ObjectType()
export class DailyTask extends BaseModel {
  @Field()
  description: string

  @Field(() => Athlete)
  athlete?: Athlete
}
