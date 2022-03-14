import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class PerformanceInput {
  @Field(() => [Int])
  sets: number[]

  @Field(() => ID)
  exerciseId: string
}
