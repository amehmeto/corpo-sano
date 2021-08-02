import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Program {
  @Field(() => ID)
  id: string

  @Field()
  title: string
}
