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

const exerciseFixture = {
  id: Faker.datatype.uuid(),
  template: new ExerciseTemplate({
    id: '00000000-0000-0000-0000-000000000008',
    title: 'Lunge',
  }),
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
  })

  beforeEach(async () => {
    const createdExercise = await exerciseRepository.create(exerciseFixture)
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
    const expectedExercise = new Exercise({
      id: exerciseId,
      createAt: expect.any(Date),
      template: new ExerciseTemplate({
        id: '00000000-0000-0000-0000-000000000008',
        title: 'Lunge',
      }),
    })

    const retrievedExercise = await exerciseRepository.findById(exerciseId)

    expect(retrievedExercise).toStrictEqual(expectedExercise)
  })
})
