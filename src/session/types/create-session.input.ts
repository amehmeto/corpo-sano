import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { Performance } from '../../performance/models/performance.model'

@InputType()
export class CreateSessionInput {
  @IsUUID()
  @Field(() => ID)
  workoutId: string

  @Field()
  performances: Performance[]
}
