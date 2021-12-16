import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Performance } from '../../performance/models/performance.model'

@ObjectType()
export class Session {
  @Field(() => ID)
  id: string

  @Field(() => [Performance])
  performances: Performance[]
}
