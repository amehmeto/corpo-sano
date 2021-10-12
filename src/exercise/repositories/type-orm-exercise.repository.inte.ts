import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import * as Faker from 'faker'
import { Exercise } from '../entities/exercise.entity'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { execSync } from 'child_process'

const exerciseFixture = new Exercise({
  id: Faker.datatype.uuid(),
  template: new ExerciseTemplate({
    id: '00000000-0000-0000-0000-000000000008',
    title: 'Lunge',
  }),
})

function exerciseDataBuilder(exercise = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    createAt: expect.any(Date),
    template: new ExerciseTemplate({
      id: '00000000-0000-0000-0000-000000000008',
      title: 'Lunge',
    }),
    numberOfSets: 0,
    numberOfReps: 0,
    interSetsRestTime: 0,
    finalRestTime: 0,
  }
  return { ...template, ...exercise }
}

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmWorkoutRepository,
          TypeOrmProgramRepository,
        ]),
      ],
    }).compile()

    exerciseRepository = module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )

    execSync('yarn db:seed')
  })

  beforeEach(async () => {
    const createdExercise = new Exercise(exerciseFixture)
    await exerciseRepository.save(createdExercise)
  })

  afterAll(async () => {
    await exerciseRepository.query(`DELETE FROM exercise;`)
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const exerciseId = exerciseFixture.id
    const expectedExercise = new Exercise(
      exerciseDataBuilder({ id: exerciseId }),
    )

    const retrievedExercise = await exerciseRepository.findById(exerciseId)

    expect(retrievedExercise).toStrictEqual(expectedExercise)
  })
})
