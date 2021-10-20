import { Field, InputType, Int, GraphQLISODateTime } from '@nestjs/graphql'
import { Gender } from './gender.enum'

@InputType()
export class SavePhysicalInfosInput {
  @Field(() => Int)
  height: number

  @Field(() => Int)
  weight: number

  @Field(() => Gender)
  gender: Gender

  @Field(() => GraphQLISODateTime)
  birthday: Date
}
