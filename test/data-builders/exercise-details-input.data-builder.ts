import * as Faker from 'faker'

export function exerciseDetailsInputDataBuilder(exerciseDetailsInput = {}) {
  const template = {
    exerciseId: Faker.datatype.uuid(),
    numberOfSets: Faker.datatype.number(),
    numberOfReps: Faker.datatype.number(),
    interSetsRestTime: Faker.datatype.number(),
    finalRestTime: Faker.datatype.number(),
  }
  return { ...template, ...exerciseDetailsInput }
}
