import { Test } from '@nestjs/testing'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Program } from '../../program/entities/program.entity'
import { config } from '../../../config'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { exercisesTemplatesFixture } from '../../../test/generate.fixtures'

describe('TypeOrm Exercise Template Repository', () => {
  let exerciseTemplateRepository: TypeOrmExerciseTemplateRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmExerciseTemplateRepository,
          TypeOrmExerciseRepository,
          TypeOrmWorkoutRepository,
          TypeOrmProgramRepository,
          Program,
          Workout,
        ]),
      ],
    }).compile()

    exerciseTemplateRepository = module.get<TypeOrmExerciseTemplateRepository>(
      TypeOrmExerciseTemplateRepository,
    )

    await exerciseTemplateRepository.save(exercisesTemplatesFixture)
  })

  afterAll(async () => {
    await exerciseTemplateRepository.query(`DELETE FROM exercise_template;`)
  })

  it('should be defined', () => {
    expect(exerciseTemplateRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = '00000000-0000-0000-0000-000000000004'
    const expectedExerciseTemplate = {
      id,
      title: 'Squat',
    }

    const foundExercise = await exerciseTemplateRepository.findById(id)

    expect(foundExercise).toStrictEqual(
      new ExerciseTemplate(expectedExerciseTemplate),
    )
  })

  it("should find all exercise's template", async () => {
    const expectedExerciseTemplates = exercisesTemplatesFixture

    const foundExerciseTemplates = await exerciseTemplateRepository.find()

    expect(foundExerciseTemplates).toStrictEqual(expectedExerciseTemplates)
  })
})
