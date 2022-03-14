import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  deletedAt: Date

  @Field()
  version: number
}
