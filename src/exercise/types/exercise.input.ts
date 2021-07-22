import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class ExerciseInput {
  @IsUUID()
  @Field((type) => ID)
  id: string
}
