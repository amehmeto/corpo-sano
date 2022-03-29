import { Workout } from '../../workout/entities/workout.entity'
import * as Faker from 'faker'
import { HardCodedValuesEnum } from '../../../test/fixtures/hard-coded-values.enum'
import { workoutFixture } from '../../workout/data-builders/workout.data-builder'
import { Program } from '../entities/program.entity'

export function programDataBuilder(program = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    title: 'Mon programme',
    workouts: [] as Workout[],
  }
  return { ...template, ...program } as Program
}

export const programFixture = programDataBuilder({
  id: HardCodedValuesEnum.programId,
})

export const programFixtures = [programDataBuilder({ workouts: [workoutFixture] })]
