import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Exercise } from '../entities/exercise.entity'
import { execSync } from 'child_process'
import { exerciseDataBuilder } from '../../../test/data-builders/exercise.data-builder'

const exerciseFixture = new Exercise(exerciseDataBuilder())

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
    await exerciseRepository.save(exerciseFixture)
  })

  afterAll(async () => {
    await exerciseRepository.query(`DELETE FROM exercise;`)
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const retrievedExercise = await exerciseRepository.findById(
      exerciseFixture.id,
    )

    expect(retrievedExercise).toStrictEqual(exerciseFixture)
  })
})
