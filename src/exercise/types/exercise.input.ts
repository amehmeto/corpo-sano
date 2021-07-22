import { Field, ID, InputType } from '@nestjs/graphql'
import { IsUUID, MinLength } from 'class-validator'

@InputType()
export class ExerciseInput {
  @IsUUID()
  @Field((type) => ID)
  id: string

  @MinLength(1)
  @Field((type) => String)
  title: string
}
