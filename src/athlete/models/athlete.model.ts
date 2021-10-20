import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { Gender } from '../types/gender.enum'

@ObjectType()
export class Athlete {
  @Field(() => Int)
  height: number

  @Field(() => Int)
  weight: number

  @Field(() => Gender)
  gender: Gender

  @Field(() => GraphQLISODateTime)
  birthday: Date
}
