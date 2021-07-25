import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class ExerciseInput {
  @IsUUID()
  @Field((type) => ID)
  id: string

  @IsNotEmpty()
  @IsString()
  @Field((type) => String)
  title: string
}
