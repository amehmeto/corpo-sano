import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'
import { PerformanceInput } from '../../performance/types/performance.input'

@InputType()
export class CreateSessionInput {
  @IsUUID()
  @Field(() => ID)
  workoutId: string

  @Field()
  performances: PerformanceInput[]
}
