import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
