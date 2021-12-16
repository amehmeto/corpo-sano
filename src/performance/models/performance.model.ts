import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Exercise } from '../../exercise/models/exercise.model'

@ObjectType()
export class Performance {
  @Field(() => ID)
  id: string

  @Field(() => [Number])
  sets: number[]

  /*  @Field(() => Exercise)
  exercise: Exercise*/
}
