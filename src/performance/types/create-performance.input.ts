import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreatePerformanceInput {
  @Field(() => ID)
  sessionId: string

  @Field(() => ID)
  exerciseId: string

  @Field(() => Int)
  performance: number
}
