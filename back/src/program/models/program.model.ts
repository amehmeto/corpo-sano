import { Field, ObjectType } from '@nestjs/graphql'
import { Workout } from '../../workout/models/workout.model'
import { Athlete } from '../../athlete/models/athlete.model'
import { BaseModel } from '../../__infrastructure__/graphql/base.model'

@ObjectType()
export class Program extends BaseModel {
  @Field()
  title: string

  @Field(() => [Workout])
  workouts: Workout[]

  @Field(() => Athlete)
  athlete: Athlete
}
